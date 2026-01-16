import React from "react";
import axios from "axios";

export function Categories({categoryObjectId, onClickChangeCategory}: any) {
  console.log(categoryObjectId);
  //const [activeCategory, setActiveCategory] = React.useState<string | null>(null);
  const [categories, setCategories] = React.useState<{_id: string; name: string }[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await axios.get("http://localhost:4900/categories");
        setCategories(data);
      } catch (error) {
        console.error("Ошибка загрузки категорий: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);
/*
  const onClickCategory = (objectId: string | null) => {
    setActiveCategory(objectId);
  }
*/
  if (loading) {
    return <div className="categories">Загрузка...</div>;
  }

  return (
    <div className="categories">
      <ul>
        <li onClick={() => onClickChangeCategory(null)} className={categoryObjectId === null ? "active" : ""}>Все</li>
        {categories.map((item) =>
          <li key={item._id} onClick={() => onClickChangeCategory(item._id)} className={categoryObjectId === item._id ? "active" : ""}>
            {item.name}
          </li>)}
      </ul>
    </div>
  );
}