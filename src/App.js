import React, { useState } from 'react';

import FeedbackOptions from 'components/FeedbackOptions';
import Notification from 'components/Notification';
import Section from 'components/Section';
import Statistics from 'components/Statistics';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedbacks = { good, neutral, bad };
  const isFeedback = good || neutral || bad;
  const optionsKeys = Object.keys(feedbacks);

  const handleClick = e => {
    const btnName = e.target.name;
    switch (btnName) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    const optionsValues = Object.values(feedbacks);
    return optionsValues.reduce((acc, value) => acc + value, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good / countTotalFeedback()) * 100);
  };

  return (
    <>
      <Section text="Please leave feedback">
        <FeedbackOptions options={optionsKeys} onLeaveFeedback={handleClick} />
      </Section>
      <Section text="Statistics">
        {isFeedback ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="No feedback given" />
        )}
      </Section>
    </>
  );
}
