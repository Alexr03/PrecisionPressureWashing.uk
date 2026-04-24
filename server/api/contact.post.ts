import nodemailer from 'nodemailer'

interface ContactForm {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!config.smtpUser || !config.smtpPass) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Email service is not configured.',
    })
  }

  const body = await readBody<ContactForm>(event)

  // Validate required fields
  if (!body.name?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Name is required.' })
  }
  if (!body.phone?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Phone number is required.' })
  }
  if (!body.service?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Service selection is required.' })
  }

  const port = Number(config.smtpPort) || 587
  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  })

  const emailLines = [
    `<h2>New Quote Request</h2>`,
    `<table style="border-collapse:collapse;width:100%;max-width:500px;font-family:sans-serif;">`,
    `<tr><td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(body.name)}</td></tr>`,
    `<tr><td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee;">Phone</td><td style="padding:8px 12px;border-bottom:1px solid #eee;"><a href="tel:${escapeHtml(body.phone)}">${escapeHtml(body.phone)}</a></td></tr>`,
    body.email ? `<tr><td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px 12px;border-bottom:1px solid #eee;"><a href="mailto:${escapeHtml(body.email)}">${escapeHtml(body.email)}</a></td></tr>` : '',
    `<tr><td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee;">Service</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(body.service)}</td></tr>`,
    body.message ? `<tr><td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee;">Message</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(body.message)}</td></tr>` : '',
    `</table>`,
  ].filter(Boolean).join('\n')

  try {
    await transporter.sendMail({
      from: 'Precision Pressure Washing <info@precisionpressurewashing.uk>',
      to: 'contact@precisionpressurewashing.uk',
      subject: `New Quote Request — ${body.service} — ${body.name}`,
      html: emailLines,
      replyTo: body.email || undefined,
    })

    return { success: true }
  }
  catch (err: any) {
    if (err.statusCode) throw err

    console.error('Email send error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send email. Please try again later.',
    })
  }
})

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
