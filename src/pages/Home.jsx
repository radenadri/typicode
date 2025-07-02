import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { BASE_URL } from '../config/app';
import useFetch from '../hooks/UseFetch';

export default function Home() {
  const { data, loading, error } = useFetch({
    url: `${BASE_URL}?userId=1`,
    options: {
      method: 'GET',
    },
  });

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  const filteredPosts = posts?.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="post-list">
      <div>
        <input
          type="text"
          value={search}
          placeholder="Search posts..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {filteredPosts?.map((post) => (
        <Link className="post-link" to={`/post/${post.id}`} key={post.id}>
          <article>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </article>
        </Link>
      ))}
      <hr />
      <button onClick={() => setShowForm(!showForm)}>Create post</button>
      {showForm && (
        <>
          <hr />
          <PostForm
            posts={posts}
            setPosts={setPosts}
            setShowForm={setShowForm}
          />
        </>
      )}
    </div>
  );
}

function PostForm({ posts, setPosts, setShowForm }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
    userId: 1,
  });

  const handleCreatePost = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });

    if (!response.ok) {
      throw new Error('Failed to create post');
    }

    const data = await response.json();
    setPosts([...posts, data]);

    setIsSubmitting(false);
    setShowForm(false);
  };

  return (
    <form onSubmit={handleCreatePost}>
      <input
        type="text"
        placeholder="Add title"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />
      <textarea
        rows={4}
        placeholder="Your awesome body text"
        value={newPost.body}
        onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
      />

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Saving...' : 'Save post'}
      </button>
    </form>
  );
}
