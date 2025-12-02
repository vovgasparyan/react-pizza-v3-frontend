import React from "react";
import axios from "axios";

export function Categories() {

  const [activeCategory, setActiveCategory] = React.useState(0);
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

  const onClickCategory = (index: number) => {
    setActiveCategory(index);
  }

  if (loading) {
    return <div className="categories">Загрузка...</div>;
  }

  return (
    <div className="categories">
      <ul>
        <li onClick={() => onClickCategory(0)} className={activeCategory === 0 ? "active" : ""}>Все</li>
        {categories.map((item, index) =>
          <li key={item._id} onClick={() => onClickCategory(index + 1)} className={activeCategory === index + 1 ? "active" : ""}>
            {item.name}
          </li>)}
      </ul>
    </div>
  );
}