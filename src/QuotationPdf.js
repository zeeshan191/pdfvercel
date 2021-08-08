/*eslint-disable*/
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import loginpage from './Assets/loginpage.png';

function Quotation(props) {
  const id = props.match.params.id;

  console.log(id);
  const [quotID, setQuotID] = useState();
  const [wosdate, setWOsdate] = useState();
  const [cqdate, setCqdate] = useState();
  const [cqclient, setCqclient] = useState();
  const [cqname, setCqname] = useState();
  const [cqmobileNo, setCqmobileNo] = useState();
  const [cqemail, setCqemail] = useState();
  const [termCond, setTermCond] = useState(
    "1. Above rate is applicable for 10 hours per day, 260 hours per month. \n2. Working less than 10 hours day will be considered as full working day. \n3. Supply Food, accommodation & site transportation Scope of Client. \n4. In case of non-availability of work or inadequate weather conditions, normal daily rate will be charged. \n5. Payment terms will be 30 days after receipt of the Entema al-shamal invoice. \n6. Above Rate is Exclusive of VAT . \n7. Mobilization will be done immediately after receiving the P.O. \n8. Our quotation valid for ten days from the date of this offers and is subject to the availability of manpower & equipment, until receipt of the P.O. \n9. All above mentioned conditions must be mentioned in your purchase order. Hope above quotation is made good and looking forward to get your valuable purchase order at the earliest. Your usual Cooperation would behighly appreciated."
  );
  const [ischeked, setIsChecked] = useState(false);
  const [cqtypes, setCqtypes] = useState("");

  const [entPhone, setEntPhone] = useState("013 363 1210");
  const [entEmail, setEntEmail] = useState("info@entema-sa.com");
  const [entVAT, setEntVAT] = useState("310005823700003");
  const [entMobile, setEntMobile] = useState("0559258940");
  const [entFrom, setEntFrom] = useState("Entemasw");

  const [quotDate, setQuotDate] = useState("");
  const [quotRefNo, setQuotRefNo] = useState("ENT/Jun-21/111");
  const [myDataSet, setMyDataSet] = useState([]);

  const getData = () => {
    axios
      .post("https://mssoftware.xyz/getQOMULDataonID", {
        QOID: id,
      })
      .then((response) => {
        console.log("My API data : ", response.data);

        if (response.data.length > 0) {
          setMyDataSet(response.data);
          console.log("MY DATA SET : ", myDataSet);
          setCqclient(response.data[0].CLIENT_DISP_NAME);
          setCqtypes(response.data[0].QO_TYPE);
          setCqmobileNo(response.data[0].QO_COMP_MOB);
          setCqname(response.data[0].QO_COMP_NAME);
          setCqemail(response.data[0].QO_COMP_EMAIL);
          setEntFrom(response.data[0].WO_FROM_COMP);
          setEntMobile(response.data[0].WO_FROM_MOB);
          setQuotDate(response.data[0].CREATED_DATE);
          setQuotID(response.data[0].QO_ID);
          setWOsdate(response.data[0].WO_STARTDATE);
        }
      });
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <>
      <div className="outerShell1">
        <div class="row">
          <div class="col-sm-12 print-div" id="printarea">
            <div class="row">
              <div class="col-sm-12 print-div">
                <div class="print-quot22">
                  <div class="row">
                    <div class="col-sm-3 logo-div">
                      <img
                        src={loginpage}
                        class="img-responsive"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div class="col-sm-4 print-quot1">
                      <h1>Quotation</h1>
                    </div>
                    <div class="col-sm-5">
                      <div class="print-quot33">
                        <div class="row">
                          <div class="col-sm-5 col-xs-4 pt-left">Date:</div>
                          <div
                            class="col-sm-12 pt-right"
                            style={{ marginLeft: "165px", marginTop: "-22px" }}
                          >
                            {quotDate}{" "}
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-sm-5 col-xs-4 pt-left">Quot#:</div>
                          <div
                            class="col-sm-12 pt-right"
                            style={{ marginLeft: "165px", marginTop: "-22px" }}
                          >
                            {quotID}{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-12">
                <h1 class="quot-hd">{cqtypes}</h1>
              </div>
            </div>

            <div class="row print-detail">
              <div class="col-sm-6 left1">
                <div class="print-detail11">
                  <h1>Entema Al Shamal Gen. cont. Est</h1>
                  <p class="m-0">
                    Al-Jubail St P.O. Box 2816, Jubail 31951, Saudi Arabia
                    <br />
                    <strong>Phone:</strong> 013 363 1210
                    <br />
                    <strong>Email:</strong> info@entema-sa.com
                    <br />
                    <strong>VAT No:</strong> 310005823700003
                  </p>
                </div>
              </div>

              <div class="col-sm-6 right1">
                <div class="print-detail34 pd3">
                  <h1>Work Schedule</h1>
                  <div class="row pd3-det">
                    <div class="col-sm-12">
                      <div class="row">
                        <div class="col-sm-5 pri-field-head">Valid:</div>
                        <div class="col-sm-7 pri-field-data">{wosdate} </div>
                      </div>

                      <div class="row">
                        <div class="col-sm-5 pri-field-head">From:</div>
                        <div class="col-sm-7 pri-field-data">{entFrom} </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-5 pri-field-head">
                          User Mobile No.:
                        </div>
                        <div class="col-sm-7 pri-field-data">{entMobile} </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="print-detail40" style={{ marginTop: "11px" }}>
                  <h1>Client</h1>
                  <div className="row pd3-det">
                    <div className="col-sm-6">
                      <div className="row">
                        <div className="col-sm-4 pri-field-head">Name:</div>
                        <div className="col-sm-8 pri-field-data">
                          {cqclient}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-4 pri-field-head">
                          Mobile No:
                        </div>
                        <div className="col-sm-8 pri-field-data">
                          {cqmobileNo}
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="row">
                        <div className="col-sm-4 pri-field-head">Company:</div>
                        <div className="col-sm-8 pri-field-data">{cqname}</div>
                      </div>

                      <div className="row">
                        <div className="col-sm-4 pri-field-head">Email:</div>
                        <div className="col-sm-8 pri-field-data">{cqemail}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="dash-pr1">
                  <div className="row">
                    <div className="col-sm-2 pri-field-head">Description :</div>
                    <div className="col-sm-9">
                      With reference to the above subject we are very much
                      interested to supply and Hereby Quote our best reasonable
                      price for the same.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12 mt-3">
                <div className="">
                  <table
                    className="table table-bordered"
                    style={{ width: "121%" }}
                  >
                    <thead>
                      <tr>
                        <th>Serial No.</th>
                        <th>Description</th>
                        <th>QTY</th>
                        <th>Price</th>
                        <th>Total Amt (SAR) </th>
                      </tr>
                    </thead>
                    <tbody>
                      {myDataSet.map((comment, index) => (
                        <tr>
                          <th scope="row" key={index}>
                            {comment.QO_ROW + 1}
                          </th>
                          <td>{comment.TAB_DESC}</td>
                          <td>{comment.TAB_QTY}</td>
                          <td>{comment.TAB_AMOUNT}</td>
                          <td>{comment.TAB_MAD ? comment.TAB_MAD : "N/A"}</td>
                          <td>
                            {comment.TAB_TOTAL_AMT
                              ? comment.TAB_TOTAL_AMT
                              : "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="dash-terms">
                  <h1>Terms &amp; Conditions:</h1>

                  <p>
                    1. Above rate is applicable for 10 hours per day, 260 hours
                    per month.6 Days a week.
                    <br />
                    2. Working less than 10 hours day will be considered as full
                    working day.
                    <br />
                    3. Supply Food, accommodation &amp; site transportation
                    Scope of Client.
                    <br />
                    4. In case of non-availability of work or inadequate weather
                    conditions, normal daily rate will be charged.
                    <br />
                    5. Payment terms will be 30 days after receipt of the Entema
                    al-shamal invoice.
                    <br />
                    6. Above Rate is Exclusive of VAT .<br />
                    7. Mobilization will be done immediately after receiving the
                    P.O.
                    <br />
                    8. Our quotation valid for ten days from the date of this
                    offers and is subject to the availability of manpower &amp;
                    equipment, until receipt of the P.O.
                    <br />
                    9. All above mentioned conditions must be mentioned in your
                    purchase order. Hope above quotation is made good and
                    looking forward to get your valuable purchase order at the
                    earliest. Your usual Cooperation would be highly
                    appreciated.
                  </p>
                </div>
              </div>
            </div>

            <div className="aboutclient">
              Client has to return the same Quotation to Entema Al-shamal by Fax
              or Email after Confirmation Signature.
            </div>
            <div className="clientarea">
              <h5>CLIENT ACCEPTANCE</h5>
              <h6> {cqclient}</h6>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <div class="bot-cl24">
                <div className="row">
                  <div className="col-sm-4 col-xs-4 bot-left">Name:</div>
                  <div className="col-sm-8 col-xs-8 bot-right">{cqclient}</div>
                </div>
                <div className="row">
                  <div className="col-sm-4 col-xs-4 bot-left">Title:</div>
                  <div className="col-sm-8 col-xs-8 bot-right">{cqname}</div>
                </div>
                <div className="row">
                  <div className="col-sm-4 col-xs-4 bot-left">Date:</div>

                  <div className="col-sm-8 col-xs-8 bot-right">{quotDate}</div>
                </div>
                <div className="row">
                  <div className="col-sm-4 col-xs-4 bot-left">Signature:</div>
                  <div className="col-sm-8 col-xs-8 bot-right"></div>
                </div>
              </div>

              <div class="bot-cl7">
                <h5>FOR ENTEMA AL SHAMAL GEN. CONT. EST</h5>
                <h5 className="ent">Entemasw , Manager</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quotation;
