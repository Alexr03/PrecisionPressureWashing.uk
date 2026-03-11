export interface BeforeAfterItem {
  id: number
  title: string
  description: string
  beforeLabel: string
  afterLabel: string
  beforeImage: string
  afterImage: string
}

export interface Job {
  id: string
  title: string
  description: string
  thumbnail: string // preview image shown on the homepage card
  items: BeforeAfterItem[]
}

// ── Jobs Data ──
// To add a new job:
//   1. Create a folder: /public/comparisons/job_X/
//   2. Add numbered sub-folders with before.png & after.png
//   3. Add the job entry below
export const jobs: Job[] = [
  {
    id: 'job_1',
    title: 'Patio & Flooring Restoration',
    description: 'Complete pressure wash and restoration of outdoor flooring.',
    thumbnail: '/comparisons/job_1/1/after.png',
    items: [
      {
        id: 1,
        title: 'Cleaned Flooring',
        description: '',
        beforeLabel: 'Before',
        afterLabel: 'After',
        beforeImage: '/comparisons/job_1/1/before.png',
        afterImage: '/comparisons/job_1/1/after.png',
      },
      {
        id: 2,
        title: 'Cleaned Flooring',
        description: '',
        beforeLabel: 'Before',
        afterLabel: 'After',
        beforeImage: '/comparisons/job_1/2/before.png',
        afterImage: '/comparisons/job_1/2/after.png',
      },
      {
        id: 3,
        title: 'Cleaned Flooring',
        description: '',
        beforeLabel: 'Before',
        afterLabel: 'After',
        beforeImage: '/comparisons/job_1/3/before.png',
        afterImage: '/comparisons/job_1/3/after.png',
      },
      {
        id: 4,
        title: 'Cleaned Flooring',
        description: '',
        beforeLabel: 'Before',
        afterLabel: 'After',
        beforeImage: '/comparisons/job_1/4/before.png',
        afterImage: '/comparisons/job_1/4/after.png',
      },
      {
        id: 5,
        title: 'Cleaned Flooring',
        description: '',
        beforeLabel: 'Before',
        afterLabel: 'After',
        beforeImage: '/comparisons/job_1/5/before.jpeg',
        afterImage: '/comparisons/job_1/5/after.jpeg',
      },
    ],
  },
  {
    id: 'job_2',
    title: 'Patio & Flooring Restoration',
    description: 'Complete pressure wash and restoration of outdoor flooring.',
    thumbnail: '/comparisons/job_2/1/after.jpeg',
    items: [
      {
        id: 1,
        title: 'Cleaned Flooring',
        description: '',
        beforeLabel: 'Before',
        afterLabel: 'After',
        beforeImage: '/comparisons/job_2/1/before.jpeg',
        afterImage: '/comparisons/job_2/1/after.jpeg',
      },
      {
        id: 2,
        title: 'Cleaned Flooring',
        description: '',
        beforeLabel: 'Before',
        afterLabel: 'After',
        beforeImage: '/comparisons/job_2/2/before.jpeg',
        afterImage: '/comparisons/job_2/2/after.jpeg',
      },
      {
        id: 3,
        title: 'Cleaned Flooring',
        description: '',
        beforeLabel: 'Before',
        afterLabel: 'After',
        beforeImage: '/comparisons/job_2/3/before.jpeg',
        afterImage: '/comparisons/job_2/3/after.jpeg',
      }
    ],
  },
  {
    id: 'job_3',
    title: 'Patio & Flooring Restoration',
    description: 'Complete pressure wash and restoration of outdoor flooring.',
    thumbnail: '/comparisons/job_3/1/after.jpeg',
    items: [
      {
        id: 1,
        title: 'Cleaned Flooring',
        description: '',
        beforeLabel: 'Before',
        afterLabel: 'After',
        beforeImage: '/comparisons/job_3/1/before.jpeg',
        afterImage: '/comparisons/job_3/1/after.jpeg',
      }
    ],
  },
]

export function useJobs() {
  function getJobById(id: string): Job | undefined {
    return jobs.find(job => job.id === id)
  }

  return {
    jobs,
    getJobById,
  }
}
