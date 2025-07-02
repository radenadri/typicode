import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import useFetch from '../hooks/UseFetch';
import { BASE_URL } from '../config/app';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useFetch({
    url: `${BASE_URL}/${id}`,
    options: {
      method: 'GET',
    },
  });

  const [post, setPost] = useState(data);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (data) {
      setPost(data);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const deletePost = async () => {
    const response = await fetch(`${BASE_URL}/${post.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete post');
    }

    navigate('/');
  };

  return (
    <div>
      {post && (
        <>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </>
      )}
      <div className="action-group">
        <button onClick={() => setShowForm(!showForm)}>Edit post</button>
        <button className="btn-delete" onClick={() => deletePost()}>
          Delete post
        </button>
      </div>
      {showForm && (
        <>
          <hr />
          <EditForm post={post} setPost={setPost} setShowForm={setShowForm} />
        </>
      )}
    </div>
  );
}

function EditForm({ post, setPost, setShowForm }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updatedPost, setUpdatedPost] = useState({
    id: post.id,
    title: post.title,
    body: post.body,
    userId: post.userId,
  });

  const handleCreatePost = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const response = await fetch(`${BASE_URL}/${post.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPost),
    });

    if (!response.ok) {
      throw new Error('Failed to update post');
    }

    const data = await response.json();
    setPost(data);

    setIsSubmitting(false);
    setShowForm(false);
  };

  return (
    <form onSubmit={handleCreatePost}>
      <input
        type="text"
        placeholder="Add title"
        value={updatedPost.title}
        onChange={(e) =>
          setUpdatedPost({ ...updatedPost, title: e.target.value })
        }
      />
      <textarea
        rows={4}
        placeholder="Your awesome body text"
        value={updatedPost.body}
        onChange={(e) =>
          setUpdatedPost({ ...updatedPost, body: e.target.value })
        }
      />

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Saving...' : 'Save post'}
      </button>
    </form>
  );
}
