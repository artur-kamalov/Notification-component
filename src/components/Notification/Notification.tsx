/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useRef} from "react"
import './_Notification.css'
import { Status } from "../../types"

import imgSucces from '../../assets/images/icons/success.svg';
import imgError from '../../assets/images/icons/error.svg';

interface NotificationProps {
    status: Status,
    label: string,
    text: string,
    setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const Notification = ({label, status, text, setIsShown}: NotificationProps) => {
    let barWidth = 0 // <-- текущая ширина load-bar`a в %
    const animationSpeed = 30;// <-- скорость анимации

    const bar = useRef<HTMLDivElement>(null) //<-- ссылка на элемент .bar
    const timeoutRefId = useRef<NodeJS.Timeout>() //
    const intervalRefId = useRef<NodeJS.Timer>() //


    // Функция анимации(увеличивает ширину barWidth на 1)
    const animate = () => {
        barWidth++
        if(bar.current){ 
            bar.current.style.width = `${barWidth}%`
        } else {
            clearTimer(); 
            alert('Please reload the page')
        }
    };
    // установка и очистка setTimoue и setInterval 
    function setTimer() {
        timeoutRefId.current = setTimeout(() => {
            setIsShown(false)
        }, 3000)
        intervalRefId.current = setInterval(() => {
            if (barWidth === 100) {
                setIsShown(false)
                clearTimer()
            } else {
                animate();
            }
        }, animationSpeed);
    }
    function clearTimer() {
        clearTimeout(timeoutRefId.current);
        clearInterval(intervalRefId.current);
    }
    // обработчики наведения мыши на уведомление
    const onMouseLeaveHandler = () => {
        setTimer()
    }
    const onMouseEnterHandler:React.MouseEventHandler<HTMLDivElement> = (e) => {
        clearTimer()
    }

    useEffect(() => {   
        setTimer() 
        return () => {
            clearTimer()
        }
    }, [status])
  return (
        <div 
            className="notification"
            onMouseOver={onMouseEnterHandler} 
            onMouseLeave={onMouseLeaveHandler}
        >
            <div className="notification-icon__container">
                {status === 'success' 
                    ? <img src={imgSucces} alt='success'/>
                    : <img src={imgError} alt='error'/>
                }
            </div>
            <div className="notification-content">
                <h3 className="notification__label">{label}</h3>
                <p className="notification__text">{text}</p>
                <div className="progress">
                    <div ref={bar} className="bar"/>
                </div>
            </div>
        </div>
    )
}

export default memo(Notification)