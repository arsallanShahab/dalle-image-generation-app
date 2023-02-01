import React, { useEffect, useState } from "react";
import { Card, FormField, Loader } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post, index) => {
      return <Card key={post._id} {...post} />;
    });
  }
  return (
    <h2 className="mt-5 font-bold text-xl text-[#6449ff] uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPost, setAllPost] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:7171/api/v1/post", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          const result = await res.json();
          setAllPost(result.data.reverse());
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchAllPost();
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;
    clearTimeout(searchTimeout);
    setTextSearch(value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPost.filter((post) => {
          return (
            post.prompt.toLowerCase().includes(value.toLowerCase()) ||
            post.name.toLowerCase().includes(value.toLowerCase())
          );
        });
        setSearchedResults(searchResults);
      }, 300)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <h1 className="font-extrabold max-w-3xl pt-20 font-poppins text-[32px] text-7xl text-[#222328]">
        The Community Showcase
      </h1>
      <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
        Browse through a collection of imaginative and visually stunning images
        generated by DALL-E AI
      </p>
      <div className="mt-16">
        <FormField
          labelName={"Search Posts"}
          type="text"
          name={"text"}
          placeholder="search posts"
          value={textSearch}
          handleChange={handleSearch}
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {textSearch && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing results for{" "}
                <span className="text-[#222328]">{textSearch}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {textSearch ? (
                <RenderCards
                  data={searchedResults}
                  title="No search results found"
                />
              ) : (
                <RenderCards data={allPost} title="No post found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;