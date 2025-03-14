import { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import './main.css';
import { Header } from '../components/Header';

export const MainPage: FC = () => {
  const oldFormData = useSelector((state: RootState) => state.form.oldState);
  const newFormData = useSelector((state: RootState) => state.form.newState);
  const [highlightedFields, setHighlightedFields] = useState<string[]>([]);
  const highlightingTimer = useRef<number>(null);

  useEffect(() => {
    const highlightedFieldsTemp = [];
    for (const [key, value] of Object.entries(newFormData)) {
      if (
        value !== oldFormData[key as keyof typeof oldFormData] &&
        key !== 'countries'
      ) {
        highlightedFieldsTemp.push(key);
      }
    }
    setHighlightedFields(highlightedFieldsTemp);

    highlightingTimer.current = setTimeout(() => {
      setHighlightedFields([]);
    }, 5000);
    return () => {
      if (highlightingTimer.current) {
        clearTimeout(highlightingTimer.current);
      }
    };
  }, [newFormData]);

  return (
    <>
      <Header />
      {newFormData ? (
        <div style={{ width: '50%', margin: '0 auto' }}>
          <p
            className={highlightedFields.includes('name') ? 'highlighted' : ''}
          >
            <strong>Name:</strong> {newFormData.name}
          </p>
          <p className={highlightedFields.includes('age') ? 'highlighted' : ''}>
            <strong>Age:</strong> {newFormData.age}
          </p>
          <p
            className={highlightedFields.includes('email') ? 'highlighted' : ''}
          >
            <strong>Email:</strong> {newFormData.email}
          </p>
          <p
            className={
              highlightedFields.includes('password') ? 'highlighted' : ''
            }
          >
            <strong>Password:</strong> {newFormData.password}
          </p>
          <p
            className={
              highlightedFields.includes('gender') ? 'highlighted' : ''
            }
          >
            <strong>Gender:</strong> {newFormData.gender}
          </p>
          <p
            className={
              highlightedFields.includes('country') ? 'highlighted' : ''
            }
          >
            <strong>Country:</strong> {newFormData.country}
          </p>
          {newFormData.picture && (
            <img
              className={
                highlightedFields.includes('picture') ? 'highlighted' : ''
              }
              src={newFormData.picture}
              alt="Uploaded"
              width={100}
            />
          )}
        </div>
      ) : (
        <p>No data</p>
      )}
    </>
  );
};
