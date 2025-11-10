import {JobApplication} from '@/models/JobApplication';
import {ExperienceLevel} from '@/models/ExperienceLevel';
import {ApplicationState} from '@/models/ApplicationState';

export const hardcodedApps: JobApplication[] = [
    new JobApplication(
        1,
        'OpenAI',
        'Machine Learning Engineer',
        'ML-2025-001',
        ExperienceLevel.Senior,
        9,
        ApplicationState.Applied,
        new Date('2025-10-01'),
        new Date('2025-10-05'),
        'https://openai.com/careers/ml-engineer'
    ),

    new JobApplication(
        2,
        'Google DeepMind',
        'Research Scientist',
        'RS-2025-118',
        ExperienceLevel.StaffPlus,
        10,
        ApplicationState.interviewRound(2),
        new Date('2025-09-20'),
        new Date('2025-10-15'),
        'https://deepmind.google/careers/research-scientist'
    ),

    new JobApplication(
        3,
        'Meta AI',
        'Software Engineer',
        'FB-SE-0925',
        ExperienceLevel.Intermediate,
        8,
        ApplicationState.Offer,
        new Date('2025-08-12'),
        new Date('2025-09-30'),
        'https://www.metacareers.com/jobs/software-engineer'
    ),

    new JobApplication(
        4,
        'Netflix',
        'Backend Developer',
        'NET-BE-771',
        ExperienceLevel.Junior,
        6,
        ApplicationState.Rejected,
        new Date('2025-07-10'),
        new Date('2025-08-01'),
        'https://jobs.netflix.com/backend-developer'
    ),

    new JobApplication(
        5,
        'Tesla',
        'Full Stack Engineer',
        'TSL-FS-332',
        ExperienceLevel.Entry,
        7,
        ApplicationState.interviewRound(1),
        new Date('2025-10-10'),
        new Date('2025-10-25'),
        'https://www.tesla.com/careers/fullstack-engineer'
    ),
];