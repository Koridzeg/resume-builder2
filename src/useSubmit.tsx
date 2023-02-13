import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Education, Experience, WizardFormData } from "./types";


type ModifiedData = {
    name: string,
    surname: string,
    image: File,
    about_me: string,
    email: string,
    phone_number: string,
    experiences: Experience[],
    educations:Education[];
  };

  const useSubmit = (formData: WizardFormData) => {
    function removeEmptyObjects<T extends object>(array: T[]): T[] {
        return array.filter((obj:T) => {
          return Object.values(obj).some((val) => val);
        });
    }

    const navigate = useNavigate();

    const postData = async () => {
        try {
            const res = await axios({
                method: "get",
                url: formData.image,
                responseType: "blob",
            });

            const file = new File([res.data], "image", { type: "image/png" });
            const formatedNumber = formData.phone_number.replace(/\s/g, '');
            const modifiedData:ModifiedData = {
                ...formData,
                image: file,
                experiences: removeEmptyObjects(formData.experiences),
                educations: removeEmptyObjects(formData.educations),
                phone_number: formatedNumber,
            };

            // Format the dates as "2017/06/25"
            modifiedData.experiences.forEach((experience) => {
                experience.start_date = new Date(experience.start_date).toISOString().split('T')[0];
                experience.due_date = new Date(experience.due_date).toISOString().split('T')[0];
              });
              modifiedData.educations.forEach((education) => {
                education.due_date = new Date(education.due_date).toISOString().split('T')[0];
              });

            console.log(modifiedData)

            const response = await axios.post(
                "https://resume.redberryinternship.ge/api/cvs",
                modifiedData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(response.data);
            navigate("/finishedresume", {
                state: response.data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return postData;
};

export default useSubmit;