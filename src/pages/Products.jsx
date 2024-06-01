import { useParams } from "react-router-dom";
import { CategoriesTab } from "../components";

export const Products = () => {
  const { productName } = useParams();

  return (
    <>
      <CategoriesTab productName={productName} />
    </>
  );
};