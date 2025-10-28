const IS_DEBUG_PersonalGallery = import.meta.env.VITE_IS_DEBUG_PersonalGallery;

const isDebug = IS_DEBUG_PersonalGallery === "true";

const PersonalGallery_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default PersonalGallery_isDebug;
