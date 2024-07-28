export const logoImgUrl =
  "https://storage.googleapis.com/cdn.healthtrak.com/app/sha-a04d7f0/public/img/sharecare/logo.svg";
export const bannerImgUrl =
  "https://storage.googleapis.com/cdn.healthtrak.com/app/sha-a04d7f0/public/img/sharecare/signup/banner_1.png";

export const editSvg = (isError) => {
  return (
    <svg
      width="25"
      height="25"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill={isError ? "#EF4444" : "#1C2A46"}
        fill-rule="evenodd"
        d="M18.6778 2.70711C17.5062 1.53554 15.6067 1.53554 14.4351 2.70711L4.17044 12.9718L3.10607 18.7795C2.85377 20.1561 4.05717 21.3595 5.43384 21.1072L11.2415 20.0429L21.5062 9.77818C22.6778 8.60661 22.6778 6.70711 21.5062 5.53554L18.6778 2.70711ZM15.8493 4.12132C16.2399 3.7308 16.873 3.7308 17.2635 4.12132L20.092 6.94975C20.4825 7.34028 20.4825 7.97344 20.092 8.36396L18.5923 9.86366L14.3496 5.62102L15.8493 4.12132ZM12.9354 7.03524L6.02533 13.9453L5.0733 19.14L10.268 18.188L17.1781 11.2779L12.9354 7.03524Z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
};

export const genderValue = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
  {
    value: "other",
    label: "Other",
  },
];

export const fullnameRegex = /^[A-Za-z]+ [A-Za-z]+$/;
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const mobileRegex = /(\d{3})(\d{3})(\d{4})/;
export const fieldArr = [
  "fullname",
  "mobile",
  "address",
  "city",
  "state",
  "dob",
  "email",
  "gender",
];
