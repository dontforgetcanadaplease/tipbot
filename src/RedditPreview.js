import { useState, useEffect } from 'react';
import { getRedditComment } from './utils';

import './RedditPreview.scss';

export default ({ id, onRecipientChange = null }) => {
  const [post, setPost] = useState(null);
  useEffect(() => {
    getRedditComment(id).then(post => {
      setPost(post);
      if (onRecipientChange) onRecipientChange(post.author);
    });
  }, [id]);
  if (!post) return null;
  let text = post.body;
  if (post.title) {
    text = post.title;
    if (post.selftext) text += ': ' + post.selftext;
  }
  if (text.length > 220) text = text.substr(0, 220) + '...';
  return <div className="reddit-preview">
    <div className="author">{post.author}</div>
    <div className="body">{text}</div>
  </div>;
};
