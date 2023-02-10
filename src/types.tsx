 export type secondFormDataTypes = {
    position: string,
    employer: string,
    startingDate: string | null,
    endingDate: string | null,
    description: string,
}


export type firstFormDataTypes = {
    name: string,
    surname: string,
    image: FileList | null,
    aboutMe: string,
    email: string,
    number: string,
}


 export type WizardFormData = firstFormDataTypes & secondFormDataTypes