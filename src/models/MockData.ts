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
        ExperienceLevel.Manager,
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
        ExperienceLevel.Intern,
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

    new JobApplication(
        6,
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
        7,
        'Google DeepMind',
        'Research Scientist',
        'RS-2025-118',
        ExperienceLevel.Staff,
        10,
        ApplicationState.interviewRound(2),
        new Date('2025-09-20'),
        new Date('2025-10-15'),
        'https://deepmind.google/careers/research-scientist'
    ),

    new JobApplication(
        8,
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
        9,
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
        10,
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

    new JobApplication(
        11,
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
        12,
        'Google DeepMind',
        'Research Scientist',
        'RS-2025-118',
        ExperienceLevel.Principal,
        10,
        ApplicationState.interviewRound(2),
        new Date('2025-09-20'),
        new Date('2025-10-15'),
        'https://deepmind.google/careers/research-scientist'
    ),

    new JobApplication(
        13,
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
        14,
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
        15,
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

    new JobApplication(
        16,
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
        17,
        'Google DeepMind',
        'Research Scientist',
        'RS-2025-118',
        ExperienceLevel.Principal,
        10,
        ApplicationState.interviewRound(2),
        new Date('2025-09-20'),
        new Date('2025-10-15'),
        'https://deepmind.google/careers/research-scientist'
    ),

    new JobApplication(
        18,
        'Meta AI',
        'Software Engineer',
        'FB-SE-0925',
        ExperienceLevel.Intern,
        8,
        ApplicationState.Offer,
        new Date('2025-08-12'),
        new Date('2025-09-30'),
        'https://www.metacareers.com/jobs/software-engineer'
    ),

    new JobApplication(
        19,
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
        20,
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

    new JobApplication(
        21,
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
        22,
        'Google DeepMind',
        'Research Scientist',
        'RS-2025-118',
        ExperienceLevel.Staff,
        10,
        ApplicationState.interviewRound(2),
        new Date('2025-09-20'),
        new Date('2025-10-15'),
        'https://deepmind.google/careers/research-scientist'
    ),

    new JobApplication(
        23,
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
        24,
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
        25,
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