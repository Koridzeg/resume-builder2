

export type WizardFormData = {
    name: string,
    surname: string,
    image: string,
    about_me: string,
    email: string,
    phone_number: string,
    experiences: Experience[],
    educations:Education[];
}

export type Experience = {
    position: string,
    employer: string,
    start_date: string,
    due_date: string,
    description: string,
}


export type Education = {
    institute: string,
    degree_id: number,
    due_date: string,
    description: string
}