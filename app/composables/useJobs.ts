interface BaseItem {
  id: number
  title: string
  description: string
}

export interface ComparisonItem extends BaseItem {
  type: 'comparison'
  beforeLabel: string
  afterLabel: string
  beforeImage: string
  afterImage: string
}

export interface StaticItem extends BaseItem {
  type: 'static'
  image: string
}

export type GalleryItem = ComparisonItem | StaticItem

export interface JobReview {
  author: string
  location?: string
  rating?: number // 1–5
  text: string
  date?: string // free-form display date e.g. "May 2026"
}

export interface Job {
  id: string
  title: string
  description: string
  thumbnail: string // preview image shown on the homepage card
  items: GalleryItem[]
  review?: JobReview
}

// ── Jobs Data ──
// Jobs can mix two item types:
//   - { type: 'comparison', beforeImage, afterImage } — draggable before/after slider
//   - { type: 'static', image }                       — single image (no slider)
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
        type: 'comparison',
        beforeLabel: 'Before',
        afterLabel: 'After',
        beforeImage: '/comparisons/job_1/1/before.png',
        afterImage: '/comparisons/job_1/1/after.png',
      },
      {
        id: 2,
        title: 'Cleaned Flooring',
        description: '',
        type: 'comparison',
        beforeLabel: 'Before',
        afterLabel: 'After',
        beforeImage: '/comparisons/job_1/2/before.png',
        afterImage: '/comparisons/job_1/2/after.png',
      },
      {
        id: 3,
        title: 'Cleaned Flooring',
        description: '',
        type: 'comparison',
        beforeLabel: 'Before',
        afterLabel: 'After',
        beforeImage: '/comparisons/job_1/3/before.png',
        afterImage: '/comparisons/job_1/3/after.png',
      },
      {
        id: 4,
        title: 'Cleaned Flooring',
        description: '',
        type: 'comparison',
        beforeLabel: 'Before',
        afterLabel: 'After',
        beforeImage: '/comparisons/job_1/4/before.png',
        afterImage: '/comparisons/job_1/4/after.png',
      },
      {
        id: 5,
        title: 'Cleaned Flooring',
        description: '',
        type: 'comparison',
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
        title: 'Driveway Cleaning',
        description: '',
        type: 'comparison',
        beforeLabel: 'Before',
        afterLabel: 'After',
        beforeImage: '/comparisons/job_2/1/before.jpeg',
        afterImage: '/comparisons/job_2/1/after.jpeg',
      },
      {
        id: 2,
        title: 'Driveway Cleaning',
        description: '',
        type: 'comparison',
        beforeLabel: 'Before',
        afterLabel: 'After',
        beforeImage: '/comparisons/job_2/2/before.jpeg',
        afterImage: '/comparisons/job_2/2/after.jpeg',
      },
      {
        id: 3,
        title: 'Driveway Cleaning',
        description: '',
        type: 'comparison',
        beforeLabel: 'Before',
        afterLabel: 'After',
        beforeImage: '/comparisons/job_2/3/before.jpeg',
        afterImage: '/comparisons/job_2/3/after.jpeg',
      },
      {
        id: 4,
        title: 'Resanded & Finished',
        description: '',
        type: 'static',
        image: '/comparisons/job_2/4/1.jpeg',
      },
      {
        id: 5,
        title: 'Resanded & Finished',
        description: '',
        type: 'static',
        image: '/comparisons/job_2/4/2.jpeg',
      },
      {
        id: 6,
        title: 'Resanded & Finished',
        description: '',
        type: 'static',
        image: '/comparisons/job_2/4/3.jpeg',
      },
    ],
    review: {
      author: 'Sabrina',
      rating: 5,
      text: 'John did an outstanding job cleaning our driveway and patio, looks good as new. He not only cleaned it he weeded it and resanded it too and finished to an excellent standard. Highly recommend',
    },
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
        type: 'comparison',
        beforeLabel: 'Before',
        afterLabel: 'After',
        beforeImage: '/comparisons/job_3/1/before.jpeg',
        afterImage: '/comparisons/job_3/1/after.jpeg',
      }
    ],
    review: {
      author: 'Ray',
      rating: 5,
      text: 'Precision cleaned our drive to a very high standard. Not only cleaned but removed weeds, and also got rid of an oil patch. They then came back and sanded the following day once all was dry.\nI hadn’t realised how dirty the drive was. It now looks brand new.\nTop job Precision…highly recommended.',
    },
  },
  {
    id: 'job_4',
    title: 'Patio & Flooring Restoration',
    description: 'Complete pressure wash and restoration of outdoor flooring.',
    thumbnail: '/comparisons/job_4/1/after.jpeg',
    items: [
      {
        id: 1,
        title: 'Cleaned Flooring',
        description: '',
        type: 'comparison',
        beforeLabel: 'Before',
        afterLabel: 'After',
        beforeImage: '/comparisons/job_4/1/before.jpeg',
        afterImage: '/comparisons/job_4/1/after.jpeg',
      },
      {
        id: 2,
        title: 'Cleaned Flooring',
        description: '',
        type: 'comparison',
        beforeLabel: 'Before',
        afterLabel: 'After',
        beforeImage: '/comparisons/job_4/2/before.jpeg',
        afterImage: '/comparisons/job_4/2/after.jpeg',
      },
    ],
    review: {
      author: 'Tricia',
      rating: 5,
      text: 'Precision cleaned my Mother in Laws drive, patio and back garden.\nShe was delighted with the results.\nJohn and his team did an amazing job, arrived promptly and achieved amazing results.\nThey are hardworking and efficient. Left everything immaculate. A very professional job, highly recommended .',
    },
  },
  {
    id: 'job_5',
    title: 'Patio & Flooring Restoration',
    description: 'Complete pressure wash and restoration of outdoor flooring.',
    thumbnail: '/comparisons/job_5/1/after.jpeg',
    items: [
      {
        id: 1,
        title: 'Cleaned Flooring',
        description: '',
        type: 'comparison',
        beforeLabel: 'Before',
        afterLabel: 'After',
        beforeImage: '/comparisons/job_5/1/before.jpeg',
        afterImage: '/comparisons/job_5/1/after.jpeg',
      },
      {
        id: 2,
        title: 'Finished Result',
        description: '',
        type: 'static',
        image: '/comparisons/job_5/2/1.jpeg',
      },
      {
        id: 3,
        title: 'Finished Result',
        description: '',
        type: 'static',
        image: '/comparisons/job_5/2/2.jpeg',
      },
      {
        id: 4,
        title: 'Finished Result',
        description: '',
        type: 'static',
        image: '/comparisons/job_5/2/3.jpeg',
      },
      {
        id: 5,
        title: 'Finished Result',
        description: '',
        type: 'static',
        image: '/comparisons/job_5/2/4.jpeg',
      },
      {
        id: 6,
        title: 'Finished Result',
        description: '',
        type: 'static',
        image: '/comparisons/job_5/2/5.jpeg',
      },
      {
        id: 7,
        title: 'Finished Result',
        description: '',
        type: 'static',
        image: '/comparisons/job_5/2/6.jpeg',
      },
      {
        id: 8,
        title: 'Finished Result',
        description: '',
        type: 'static',
        image: '/comparisons/job_5/2/7.jpeg',
      },
      {
        id: 9,
        title: 'Finished Result',
        description: '',
        type: 'static',
        image: '/comparisons/job_5/2/8.jpeg',
      },
      {
        id: 10,
        title: 'Finished Result',
        description: '',
        type: 'static',
        image: '/comparisons/job_5/2/9.jpeg',
      },
    ],
    review: {
      author: 'Michael',
      rating: 5,
      text: "Honestly cannot recommend these guys highly enough.\nI'd probably given them one of there toughest jobs to date. But they weren't done until all of the 12yr old grime had gone!\nYou now cannot tell the difference between our 12yr old slabs and the newly laid one 👌🏻 Top top effort",
    },
  },
  {
    id: 'job_7',
    title: 'Patio & Flooring Restoration',
    description: 'Complete pressure wash and restoration of outdoor flooring.',
    thumbnail: '/comparisons/job_7/1/after.jpeg',
    items: [
      {
        id: 1,
        title: 'Cleaned Flooring',
        description: '',
        type: 'comparison',
        beforeLabel: 'Before',
        afterLabel: 'After',
        beforeImage: '/comparisons/job_7/1/before.jpeg',
        afterImage: '/comparisons/job_7/1/after.jpeg',
      },
      {
        id: 2,
        title: 'Cleaned Flooring',
        description: '',
        type: 'comparison',
        beforeLabel: 'Before',
        afterLabel: 'After',
        beforeImage: '/comparisons/job_7/2/before.jpeg',
        afterImage: '/comparisons/job_7/2/after.jpeg',
      },
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
