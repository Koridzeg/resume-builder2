

export type WizardFormData = {
    name: string,
    surname: string,
    image: File[] | null | undefined,
    aboutMe: string,
    email: string,
    number: string,
    experiences: {
        position: string,
        employer: string,
        start_date: string | null,
        due_date: string | null,
        description: string,
    }[];
    educations: {
        institute: '',
        degree_id: ''
        due_date: '',
        description: '',
    }[];
}

interface Degree {
    id: string,
    title: string,
}