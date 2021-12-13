import React, {useState, useRef, useEffect} from 'react';
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import dayjs from 'dayjs';
import './CalendarHeader.css'
// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

var calendar = null;

const CalendarMain = (props) => {

    const [currentSchedule, setCurrentSchedule] = useState(props.originSchedule);

    const calendarRef = useRef();

    useEffect(()=>{
        if(calendarRef){
            
        calendar = calendarRef.current.getInstance();

        }
    }, [calendarRef]);
  
    /*header*/
    const [currentDate, setCurrentDate] = useState(dayjs().format('YYYY MM'));
    const [btnSelected, setBtnSelected] = useState(0);

    const onClickThisMonth = () => {
        if(calendar){
            calendar.today();
        } 
        setCurrentDate(dayjs(calendar.getDate()._date).format('YYYY MM'));
    }

    const onClickPrevMonth = () => {
        if(calendar){
            calendar.prev(); 
        }  
        setCurrentDate(dayjs(calendar.getDate()._date).format('YYYY MM'));
    }

    const onClickNextMonth = () => {
        if(calendar){
            calendar.next();   
        } 
        setCurrentDate(dayjs(calendar.getDate()._date).format('YYYY MM'));
    }

    const onClickChangeViewMonth = (e) => {
        if(calendar){
            calendar.changeView("month", true);
        } 
        setBtnSelected(e.target.id);
    }

    const onClickChangeViewWeek = (e) => {
        if(calendar){
            calendar.changeView("week", true);
        }  
        setBtnSelected(e.target.id);
    }

    const onClickChangeViewDay = (e) => {
        if(calendar){
            calendar.changeView("day", true);
        }  
        setBtnSelected(e.target.id);
    }

    /**CREATE SCHEDULE*/
    const onCreateSchedule = (e)  => {

        if(!calendar){
            return;
        }

        const newSchedule = {
            id: String(Math.random() * 1000),
            calendarId: 'test calendar',
            title: e.title,
            category: e.isAllDay ? 'allday' : 'time',
            start: e.start,
            end: e.end
        }

        calendar.createSchedules([newSchedule]);
        setCurrentSchedule([...currentSchedule, newSchedule]);

        console.log('onCreateSchedule state : ' + JSON.stringify(currentSchedule));
    }

    /**UPDATE SCHEDULE */
    const onUpdateSchedule = (e) => {

        console.log('Before update state : ' + JSON.stringify(currentSchedule));

        setCurrentSchedule(currentSchedule.filter(id => id !== e.schedule.id));

        console.log('onUpdateSchedule : ' + JSON.stringify(e));
        const {schedule, changes} = e;

        calendar.updateSchedule(schedule.id, schedule.calendarId, changes);

        setCurrentSchedule([...currentSchedule, e.schedule]);
        console.log('AFTER UPDATE state : ' + JSON.stringify(currentSchedule));
    }

    /**DELETE SCHEDULE */
    const onDeleteSchedule = (e) => {
        const {schedule} = e;
        calendar.deleteSchedule(schedule.id, schedule.calendarId);
        setCurrentSchedule(currentSchedule.filter(id => id !== e.schedule.id));

        console.log('AFTER DELETE STATE : ' + JSON.stringify(currentSchedule));
    }


    return (
        <>
         <div style={{display: 'flex', padding: '30px 30px 0 30px' }}>
                <div style={{padding: '0 20px 0 0'}}>
                    <button style={{backgroundColor: 'transparent', border: '1px solid #e7e7e7', borderRadius: '4px 4px 4px 4px ', height: '30px', width: '70px'}}>Calendar</button>
                </div>
                <div style={{padding: '0 20px 0 0'}}>
                    <button style={{backgroundColor: 'transparent', border: '1px solid #e7e7e7', borderRadius: '4px 4px 4px 4px ', height: '30px', width: '70px'}}>Project</button>
                </div>
            </div>
            <div style={{ display: "flex", margin: "30px"}}>
                <div style={{fontWeight: 'bolder', marginTop: '3px', width: '90px'}}>
                 {currentDate}
                </div>
                <button onClick={onClickPrevMonth} style={{ margin: "0 0 0 0", backgroundColor: 'transparent',  color: 'black', border: '1px solid #e7e7e7', borderRadius: '4px 0 0 4px '}}>
                    <i className="arrow left" ></i>
                </button>
                <button onClick={onClickThisMonth} style={{ margin: "0 0 0 0", backgroundColor: 'transparent',  color: 'black', border: '1px solid #e7e7e7', borderRadius: '0 0 0 0' }}>
                    Today
                </button>
                <button onClick={onClickNextMonth} style={{ margin: "0 20px 0 0", backgroundColor: 'transparent',  color: 'black', border: '1px solid #e7e7e7', borderRadius: '0 4px 4px 0' }}>
                    <i className="arrow right" ></i>
                </button>

                <button id="btnMonth" onClick={onClickChangeViewMonth} style={{width: '80px', backgroundColor: 'transparent', border: '1px solid #e7e7e7', borderRadius: '4px 0 0 4px', color: 'btnMonth' === btnSelected ? "#00C1C8" : ""}}>
                    Month
                </button>
                <button id="btnWeek"  onClick={onClickChangeViewWeek} style={{width: '80px', backgroundColor: 'transparent', border: '1px solid #e7e7e7', borderRadius: '0 0 0 0', color: 'btnWeek' === btnSelected ? "#00C1C8" : ""}}>
                    Week
                </button>
                <button id="btnDay"  onClick={onClickChangeViewDay} style={{width: '80px', backgroundColor: 'transparent',  border: '1px solid #e7e7e7', borderRadius: '0 4px 4px 0', color: 'btnDay' === btnSelected ? "#00C1C8" : ""}}>
                    Day
                </button> 
                <div className="topnav">
                    <input type="text" placeholder="Search.."></input>
                </div>
            </div>
            <Calendar id='calendar' ref={calendarRef}
                      onPrev={onClickPrevMonth}
                      onToday={onClickThisMonth}
                      onNext={onClickNextMonth}
                      onChangeView={onClickChangeViewMonth}
                      onBeforeCreateSchedule={onCreateSchedule}
                      onBeforeDeleteSchedule={onDeleteSchedule}
                      onBeforeUpdateSchedule={onUpdateSchedule}
        height="900px"
        calendars={[
            {
            id: '0',
            name: 'Private',
            bgColor: '#9e5fff',
            borderColor: '#9e5fff'
            },
            {
            id: '1',
            name: 'Company',
            bgColor: '#00a9ff',
            borderColor: '#00a9ff'
            }
        ]}
        disableDblClick={true}
        disableClick={false}
        isReadOnly={false}
        month={{
            startDayOfWeek: 0
        }}
        schedules={props.sampleSchedule}
        scheduleView
        taskView
        template={{
            milestone(schedule) {
            return `<span style="color:#fff;background-color: ${schedule.bgColor};">${
                schedule.title
            }</span>`;
            },
            milestoneTitle() {
            return 'Milestone';
            },
            allday(schedule) {
            return `${schedule.title}<i class="fa fa-refresh"></i>`;
            },
            alldayTitle() {
            return 'All Day';
            }
        }}
        //   theme={myTheme}
        timezones={[
            {
            timezoneOffset: 540,
            displayLabel: 'GMT+09:00',
            tooltip: 'Seoul'
            }
        ]}
        useDetailPopup
        useCreationPopup
        view={'month'} // You can also set the `defaultView` option.
        week={{
            showTimezoneCollapseButton: true,
            timezonesCollapsed: true
        }}/>
</>
    );
};


export default CalendarMain;