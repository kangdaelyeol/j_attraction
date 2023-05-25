import React, { useState } from 'react';
import Styles from './create.module.css';
import Day from './Day';
/** required
 * google Map
 * title
 * summary(people, location, days, weather, budget, category)
 * Day[1, 2, 3]
 * * route (locations of places)
 * * place (spendingTime, price, des), moving(way, spendingtime, tips), pictures[]
 */

const Create = () => {
	const [day, setDay] = useState([]);
  const [currentDay, setCurrentDay] = useState(0);

  const onDayClick = (index) => {
    return setCurrentDay(index);
  }

	const onAddDayClick = () => {
		setDay((day) => {
			const newday = { day: day.length + 1 };
			return [...day, newday];
		});
	};

	const onRemoveDayClick = (index) => {
		let dayIndex = 1;
		const newDays = [];
		day.forEach((v) => {
			console.log(v);
			if (Number(v.day) !== Number(index)) {
				v.day = dayIndex;
				newDays.push({
					...v,
					day: dayIndex++,
				});
			}
		});
		return setDay(newDays);
	};

	return (
		<div className={Styles.container}>
			<div className='title'>Create</div>
			<input type='text' placeholder='Title' />
			<div className='summary'>
				<select name='season' id='season'>
					<option value=''>계절</option>
					<option value='spring'>봄</option>
					<option value='summer'>여름</option>
					<option value='autumn'>가을</option>
					<option value='winter'>겨울</option>
				</select>
				<input type='text' placeholder='Budget' />
				<input type='text' placeholder='Duration' />
			</div>
			<textarea name='introduction' id='introduction' cols='30' rows='10' placeholder='간단한 여행 소개'></textarea>
			<div className='daybox'>
				{day.map((v, index) => {
					return (
						<div
							key={index}
							data-index={v.day}
              onClick={() => {onDayClick(v.day)}}
							className='day'
						>
							day{v.day}
              <button onClick={(e) => {
								onRemoveDayClick(v.day);
							}}>remove</button>
						</div>
					);
				})}
				<div onClick={onAddDayClick} className='addday'>
					addDay
				</div>
			</div>
      {currentDay > 0 ? <Day info={day[currentDay - 1]}/> : ""}
			
      <button className="save">save!</button>
		</div>
	);
};

export default Create;