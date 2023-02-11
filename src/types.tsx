

export type WizardFormData = {
    name: string,
    surname: string,
    image: string,
    about_me: string,
    email: string,
    phone_number: string,
    experiences: {
        position: string,
        employer: string,
        start_date: string,
        due_date: string ,
        description: string,
    }[];
    educations: {
        institute: string,
        degree_id: number,
        due_date: string,
        description: string
    }[];
}
