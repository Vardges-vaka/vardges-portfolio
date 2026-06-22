import { useEffect, useMemo, useState } from "react";
import { normalizeCuisineTagIds } from "../../02_cK_setup_hlpr/brandDetail_helpers.js";

const countLinkedCuisineTags = (linkedCuisineTags = [], draftCuisineTags = []) => {
  const source = linkedCuisineTags.length
    ? linkedCuisineTags
    : draftCuisineTags;
  return normalizeCuisineTagIds(source).length;
};

export const useBrandCuisineTagsField = ({ brand, brandDraft }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const linkedCuisineTags = brand?.cuisineTags ?? [];

  useEffect(() => {
    setSearchOpen(false);
  }, [brand?._id]);

  const total = useMemo(
    () =>
      countLinkedCuisineTags(linkedCuisineTags, brandDraft?.cuisineTags ?? []),
    [brandDraft?.cuisineTags, linkedCuisineTags],
  );

  return {
    headerAsideProps: {
      total,
      isSearchOpen: searchOpen,
      onToggleSearch: () => setSearchOpen((open) => !open),
    },
    fieldState: {
      linkedCuisineTags,
      cuisineTagsSearchOpen: searchOpen,
    },
  };
};
