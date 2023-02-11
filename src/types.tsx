

export type WizardFormData = {
    name: string,
    surname: string,
    image: File[] | null | undefined,
    about_me: string,
    email: string,
    phone_number: string,
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
