

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
        startingDate: string | null,
        endingDate: string | null,
        description: string,
    }[];
    institute: string,
    degree: Degree[]
    due_date: string | null,
    eduDescription: string,
}

interface Degree {
    id: string,
    title: string,
}