import { useState, useEffect, useRef } from "react";
import { useInterval } from "../hooks/useInterval.jsx"
import { Cursor } from "react-simple-typewriter"
import logText from '../log.txt'

const MainPage = () => {

  const [delay, setDelay] = useState(500);
  const [count, setCount] = useState(0);
  const [logData, setLogData] = useState(() => {
    const fetchData = async () => {
      let logData = [];
      fetch(logText)
        .then((r) => r.text())
        .then(text => {
          logData = text.split("\n");
          setLogData(logData);
        })
    };
    fetchData();
  });
  const [vlogData, setVlogData] = useState([]);

  // Increment the counter.
  useInterval(() => {
    setCount(count + 1);
    console.log(count)
  }, delay);

  // Make it faster every second!
  useInterval(() => {
    if (count < 2) {
      setDelay(delay);
    } else{
      setDelay(delay / 10);
    }
  }, 500);

  function handleReset() {
    setDelay(1000);
  }

  // Use setTimeout to simulate a delayed action

  useEffect(() => {

    if (logData != null) {

      if( count < 499) {
        setVlogData((vlogData) => {
          return [...vlogData, logData[count]]
        });
      }

      if (count > 30) window.scrollTo({ top: 15000, left: 0 })
    }

    if (count == 500) {
      setVlogData(null);
    }

    if (count == 1000) {
      setDelay(null);
    }

  }, [count]);

  return (
    <>
      <div>
        {
          vlogData &&
          vlogData.map((item, i) => {
            return <p key={i}>{item}</p>
          })
          
        }
        <Cursor cursorStyle="_"/>
      </div>
      {
        (count > 998) ?
          <main id="main-wrap">
            <div className="page-header">
              <div className="main-wrapper">
                <div className="text">
                  <h1 className="uppercase">
                    <span className="split">
                      <div className="line">WEB</div>
                      <div className="symbol">
                        <div></div>
                      </div>
                    </span>
                    <span className="split">
                      <div className="line">developer</div>
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </main>
          : null
      }


    </>
  );
};

export default MainPage;
