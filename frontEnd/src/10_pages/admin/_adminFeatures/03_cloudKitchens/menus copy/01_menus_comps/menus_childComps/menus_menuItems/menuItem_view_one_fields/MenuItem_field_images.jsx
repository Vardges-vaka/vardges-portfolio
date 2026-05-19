import "../../../../_styles/menus_childComps/menus_menuItems/menuItem_view_one_fields/menuItem_field_images.css";
import {
  ShoppingCart,
  Leaf,
  Info,
  Pencil,
  Camera,
  Image,
  File,
  GalleryHorizontal,
  Eye,
  Cog,
  Globe,
  Upload,
} from "lucide-react";
const MenuItem_field_images = ({
  states,
  handlers,
  childProps,
  t,
  menuItem,
}) => {
  if (!menuItem) return null;
  const {
    main,
    aggregators,
    website,
    google,
    highRes,
    noBackgroundPng,
    jpg,
    png,
    WebP,
    ico,
    other,
  } = menuItem.images;
  const menuItem_field_images_types = [
    {
      component: (
        <ShoppingCart
          size={30}
          className={`menuItem_field_images_types ${main ? "active" : ""} main`}
          title="main"
        />
      ),
      isActive: main ? true : false,
      title: "main",
    },
    {
      component: (
        <Leaf
          size={30}
          className={`menuItem_field_images_types ${aggregators ? "active" : ""} aggregators`}
          title="aggregators"
        />
      ),
      isActive: aggregators ? true : false,
      title: "aggregators",
    },
    {
      component: (
        <Info
          size={30}
          className={`menuItem_field_images_types ${website ? "active" : ""} website`}
          title="website"
        />
      ),
      isActive: website ? true : false,
      title: "website",
    },
    {
      component: (
        <Pencil
          size={30}
          className={`menuItem_field_images_types ${google ? "active" : ""} google`}
          title="google"
        />
      ),
      isActive: google ? true : false,
      title: "google",
    },
    {
      component: (
        <Camera
          size={30}
          className={`menuItem_field_images_types ${highRes ? "active" : ""} highRes`}
          title="highRes"
        />
      ),
      isActive: highRes ? true : false,
      title: "highRes",
    },
    {
      component: (
        <Image
          size={30}
          className={`menuItem_field_images_types ${noBackgroundPng ? "active" : ""} noBackgroundPng`}
          title="noBackgroundPng"
        />
      ),
      isActive: noBackgroundPng ? true : false,
      title: "noBg_png",
    },
    {
      component: (
        <File
          size={30}
          className={`menuItem_field_images_types ${jpg ? "active" : ""} jpg`}
          title="jpg"
        />
      ),
      isActive: jpg ? true : false,
      title: "jpg",
    },
    {
      component: (
        <GalleryHorizontal
          size={30}
          className={`menuItem_field_images_types ${png ? "active" : ""} png`}
          title="png"
        />
      ),
      isActive: png ? true : false,
      title: "png",
    },
    {
      component: (
        <Eye
          size={30}
          className={`menuItem_field_images_types ${WebP ? "active" : ""} WebP`}
          title="WebP"
        />
      ),
      isActive: WebP ? true : false,
      title: "WebP",
    },
    {
      component: (
        <Cog
          size={30}
          className={`menuItem_field_images_types ${ico ? "active" : ""} ico`}
          title="ico"
        />
      ),
      isActive: ico ? true : false,
      title: "ico",
    },
    {
      component: (
        <Globe
          size={30}
          className={`menuItem_field_images_types ${other.length ? "active" : ""} other`}
          title="other"
        />
      ),
      isActive: other.length ? true : false,
      title: "other",
    },
  ];
  return (
    <aside className="menuItem_field_images">
      <img
        src={main}
        alt={menuItem.name.label}
        className="menuItem_field_images_mainImage"
      />
      <div className="menuItem_field_images_types_container">
        {[
          // First, types with isActive true
          ...menuItem_field_images_types.filter((type) => type?.isActive),
          // Then, types with isActive false or undefined
          ...menuItem_field_images_types.filter((type) => !type?.isActive),
        ].map((type) => {
          console.log("typetypetypetypetypetypetypetypetype", type);
          return (
            <div
              key={type.title}
              className="menuItem_field_images_types_item"
              title={type.title.toLocaleUpperCase()}>
              {type.isActive ? (
                <>{type.component}</>
              ) : (
                <Upload size={30} className="menuItem_field_images_types" />
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

/*


 [
    {
      component: (
        <ShoppingCart
          size={30}
          className={`menuItem_field_images_types ${main ? "active" : ""} main`}
          title="main"
        />
      ),
      label: "Main",
    },
  ];


    title={"main"}
    title={"aggregators"}
    title={"website"}
    title={"google"}
    title={"highRes"}
    title={"noBackgroundPng"}
    title={"jpg"}
    title={"png"}
    title={"WebP"}
    title={"ico"}
    title={"other"}
className={`menuItem_field_images_types ${main? "active" : ""} main`}
className={`menuItem_field_images_types ${aggregators? "active" : ""} aggregators`}
className={`menuItem_field_images_types ${website? "active" : ""} website`}
className={`menuItem_field_images_types ${google? "active" : ""} google`}
className={`menuItem_field_images_types ${highRes? "active" : ""} highRes`}
className={`menuItem_field_images_types ${noBackgroundPng? "active" : ""} noBackgroundPng`}
className={`menuItem_field_images_types ${jpg? "active" : ""} jpg`}
className={`menuItem_field_images_types ${png? "active" : ""} png`}
className={`menuItem_field_images_types ${WebP? "active" : ""} WebP`}
className={`menuItem_field_images_types ${ico? "active" : ""} ico`}
className={`menuItem_field_images_types ${ico? "active" : ""} ico`}


  main: img,
  aggregators: img,
  website: img,
  google: img,
  highRes: img,
  noBackgroundPng: img,
  jpg: img,
  png: img,
  WebP: img,
  ico: img,
  other:[
  {
    ref: "Preperation Instructions",
    path: img1,
    fileType: "pdf",
    sizeInBytes: 1000,
    description: "Preperation Instructions for the option",
  },
  ]
*/
export default MenuItem_field_images;
