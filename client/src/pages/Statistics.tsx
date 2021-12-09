import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompletedCountThunk,
  getIncompletedCountThunk,
  getOldTodosCountThunk,
  removeOldTodosThunk,
} from "../redux/todo-reducer";
import {
  selectCompletedCount,
  selectIncompletedCount,
  selectOldTodosCount,
} from "../redux/todo-selectors";
import "../scss/Statistics.scss";

const Statistics: React.FC = () => {
  return (
    <div className="statistics">
      <ul className="statistics__list">
        <li className="statistics__item">
          <Deprecated />
        </li>
        <li className="statistics__item">
          <Completed />
        </li>
        <li className="statistics__item">
          <Inompleted />
        </li>
      </ul>
    </div>
  );
};

export default Statistics;

const Deprecated: React.FC = () => {
  const dispatch = useDispatch();
  const oldTodosCount = useSelector(selectOldTodosCount);

  useEffect(() => {
    dispatch(getOldTodosCountThunk(new Date()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRemoveTodos = () => {
    dispatch(removeOldTodosThunk(new Date()));
  };

  return (
    <section className="statistics-item">
      <h2 className="statistics-item__title">Number of old todos:</h2>
      <span className="statistics-item__count">{oldTodosCount}</span>
      <span className="statistics-item__clear-btn" onClick={onRemoveTodos}>
        remove all
      </span>
    </section>
  );
};

const Completed: React.FC = () => {
  const dispatch = useDispatch();
  const completedCount = useSelector(selectCompletedCount);

  useEffect(() => {
    dispatch(getCompletedCountThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="statistics-item">
      <h2 className="statistics-item__title">Number of completed todos:</h2>
      <span className="statistics-item__count">{completedCount}</span>
    </section>
  );
};

const Inompleted: React.FC = () => {
  const dispatch = useDispatch();
  const incompletedCount = useSelector(selectIncompletedCount);

  useEffect(() => {
    dispatch(getIncompletedCountThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="statistics-item">
      <h2 className="statistics-item__title">Number of incompleted todos:</h2>
      <span className="statistics-item__count">{incompletedCount}</span>
    </section>
  );
};
