import { useState } from 'react';
import { useFormValue, set } from 'sanity';


const TagsWithAI = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const content = useFormValue(['body']); // Get post content

  const generateTags = async () => {
    if (!content) {
      setError('No content available for tag generation.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/generate-tags', {
        method: 'POST',
        body: JSON.stringify({ content }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.tags) {
        props.onChange(set(data.tags)); // Update Sanity field
      } else {
        setError('Failed to generate tags.');
      }
    } catch (err) {
      setError(`Error fetching tags: ${err.message}`);
    }

    setLoading(false);
  };

  return (
    <div>
      <button type="button" onClick={generateTags} disabled={loading}>
        {loading ? 'Generating...' : 'Generate AI Tags'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TagsWithAI;
