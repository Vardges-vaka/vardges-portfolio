export const navBarItems = (t, language) => {
  return [
    { label: t("navBar.labels.bio"), path: `/${language}/bio` },
    { label: t("navBar.labels.journey"), path: `/${language}/journey` },
    {
      label: t("navBar.labels.projects"),
      path: `/${language}/projects`,
    },
    { label: t("navBar.labels.skills"), path: `/${language}/skills` },
    {
      label: t("navBar.labels.education"),
      path: `/${language}/education`,
    },
    {
      label: t("navBar.labels.achievements"),
      path: `/${language}/achievements`,
    },
    { label: t("navBar.labels.vision"), path: `/${language}/vision` },
    { label: t("navBar.labels.values"), path: `/${language}/values` },
    { label: t("navBar.labels.contact"), path: `/${language}/contact` },
  ];
};
// 1. Personal Overview / Bio
// 2. Professional Journey
// 3. Projects & Ventures
// 4. Skills & Expertise
// 5. Education & Certifications
// 6. Achievements & Milestones
// 7. Vision & Goals
// 8. Values & Personality
// 9. Contact
/*










{
"bio": "السيرة الذاتية",
"journey": "الرحلة",
"projects": "المشاريع",
"skills": "المهارات",
"education": "التعليم",
"achievements": "الإنجازات",
"vision": "الرؤية",
"values": "القيم"
}

{
"bio": "Биография",
"journey": "Путешествие",
"projects": "Проекты",
"skills": "Навыки",
"education": "Образование",
"achievements": "Достижения",
"vision": "Видение",
"values": "Ценности"
}
{
"bio": "Կենսագրություն",
"journey": "Ճանապարհորդություն",
"projects": "Նախագծեր",
"skills": "Հմտություններ",
"education": "Կրթություն",
"achievements": "Նվաճումներ",
"vision": "Տեսլական",
"values": "Արժեքներ"
}

{
"bio": "Bio",
"journey": "Journey",
"projects": "Projects",
"skills": "Skills",
"education": "Education",
"achievements": "Achievements",
"vision": "Vision",
"values": "Values"
}




*/
