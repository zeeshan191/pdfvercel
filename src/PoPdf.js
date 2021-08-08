/*eslint-disable*/
// eslint-disable-next-line
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import loginpage from './Assets/loginpage.png';

function PoPdf(props) {
  const id = props.match.params.id;

  const [poid, setPoid] = useState();
  const [podocno, setPodocno] = useState();
  const [podate, setPodate] = useState();
  const [porevno, setPorevno] = useState();
  const [ponumber, setPonumber] = useState();
  const [poquotationref, setPoquotationref] = useState();
  const [poproject, setPoproject] = useState();
  const [popaymentmode, setPopaymentmode] = useState();
  const [povendor, setPovendor] = useState();
  const [pocode, setPocode] = useState();
  const [pophone, setPophone] = useState();
  const [pocpperson, setPocpperson] = useState();
  const [pomobile, setPomobile] = useState();
  const [poemail, setPoemail] = useState();
  const [povat, setPovat] = useState();
  const [poadd, setPoadd] = useState();
  const [postartdate, setPostartdate] = useState();
  const [poenddate, setPoenddate] = useState();
  const [polocation, setPolocation] = useState();
  const [pomobilizationdate, setPomobilizationdate] = useState();
  const [podesc, setPodesc] = useState();
  const [pototal, setPototal] = useState(0);
  const [pogst, setPogst] = useState(0);
  const [pograndtotal, setPograndtotal] = useState(0);
  const [status, setStatus] = useState(0);

  const [myDataSet, setMyDataSet] = useState([]);

  const [instruction, setInstruction] = useState(
    "1. Payment shall be made for the quantities executed as per unit rates given above. \n2. Work Order number and date must be quoted on all correspondence. \n3. This order is subject to the terms and conditions set out on the face and Annexure -A \n4. The acceptance copy must be signed by vender or by its representative ( on vender’s behalf) on the face and Annexure - A \n 5. This Work Order is subject to the cancellation unless the subcontractor returns one copy signed with confirmation that all terms and conditions are accepted. \n 6. The following attachments form an integral part of this work Order."
  );
  const [deliveryTerms, setDeliveryTerms] = useState(
    "1. Lubricants, top-up oil, repairs, daily maintenance, Service and Consumables of the Equipments shall be provide by Vender. \n2. In case of breakDown or Maintenance, Vwndor/Supplier shall provide a replacement of equipment immediatly at no extra cost."
  );
  const [conditionTerms, setConditionTerms] = useState(
    "1. Above rate is applicable for 10 hours per day, 6 days a week, 260 hours per Month. \n2. Working Duration: 2 Month Extandable. \n3. Supply Food, accommodation & Transportation scope Entema al-shamal. \n4. Above Rate is exclusive of VAT. \n5. If you need any clarification on above matter or any assistance please feel free to contract undersigned. \n6. Vendor has to return the same purchase order to Entema Al-shamal by Fax or Email after Confirmation Signature."
  );

  const [sigName, setSigName] = useState();
  const [sigNameNTitle, setSigNameNTitle] = useState();

  useEffect(() => {
    axios
      .post("http://mssoftware.xyz/getPOMULDataonID", {
        POID: id,
      })
      .then((response) => {
        {
          if (response.data.length > 0) {
            setMyDataSet(response.data);
            setPoid(response.data[0].PO_ID);
            setPodocno(response.data[0].DOC_NO);
            setPodate(response.data[0].CREATED_DATE);
            setPorevno(response.data[0].REV_NO);
            setPonumber(response.data[0].WO_NUMBER);
            setPoquotationref(response.data[0].WO_QUO_REF);
            setPoproject(response.data[0].WO_PROJECT);
            setPopaymentmode(response.data[0].WO_PAYMENT_MODE);
            setPovendor(response.data[0].VENDOR_DISP_NAME);
            setPocode(response.data[0].VI_CODE);
            setPophone(response.data[0].VI_PH_NO);
            setPocpperson(response.data[0].VI_CONTACT_PERSON);
            setPomobile(response.data[0].VI_MOBILE);
            setPoemail(response.data[0].VI_EMAIL);
            setPovat(response.data[0].VI_VAT);
            setPoadd(response.data[0].VI_ADDRESS);
            setPostartdate(response.data[0].WS_START_DATE);
            setPoenddate(response.data[0].WS_END_DATE);
            setPolocation(response.data[0].WS_LOC);
            setPomobilizationdate(response.data[0].WS_MOB_DATE);
            setPodesc(response.data[0].WS_DESC);
            setPototal(response.data[0].PO_TOTAL);
            setPogst(response.data[0].PO_GST);
            setPograndtotal(response.data[0].PO_GRANDTOTAL);
            setInstruction(response.data[0].PO_INSTRUCTION);
            setDeliveryTerms(response.data[0].PO_TOD);
            setConditionTerms(response.data[0].PO_TC);
            setStatus(response.data[0].PO_APPROVE_STATUS);
          }
        }
      });
  }, [id]);

  var th = ["", "thousand", "million", "billion", "trillion"];
  var dg = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  var tn = [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  var tw = [
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  const toWords = (s) => {
    s = s.toString();
    s = s.replace(/[\, ]/g, "");
    if (s != parseFloat(s)) return "not a number";
    var x = s.indexOf(".");
    if (x == -1) x = s.length;
    if (x > 15) return "too big";
    var n = s.split("");
    var str = "";
    var sk = 0;
    for (var i = 0; i < x; i++) {
      if ((x - i) % 3 == 2) {
        if (n[i] == "1") {
          str += tn[Number(n[i + 1])] + " ";
          i++;
          sk = 1;
        } else if (n[i] != 0) {
          str += tw[n[i] - 2] + " ";
          sk = 1;
        }
      } else if (n[i] != 0) {
        // 0235
        str += dg[n[i]] + " ";
        if ((x - i) % 3 == 0) str += "hundred ";
        sk = 1;
      }
      if ((x - i) % 3 == 1) {
        if (sk) str += th[(x - i - 1) / 3] + " ";
        sk = 0;
      }
    }

    if (x != s.length) {
      var y = s.length;
      str += "& ";
      for (var i = x + 1; i < y; i++) str += dg[n[i]] + " ";
    }
    return str.replace(/\s+/g, " ").toUpperCase();
  };
 
  return (
    <div>
      <div className="outerShell">
        <div className="row">
          <div className="col-sm-12 print-div" id="printarea">
            <div className="row ">
              <div className="col-sm-12 print-div">
                <div class="print-quot">
                  <div class="row ">
                    <div class="col-sm-3 logo-div">
                      <img
                        src={loginpage}
                        className="img-responsive"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="col-sm-4 print-quot1">
                      <h1>Purchase Order</h1>
                    </div>
                    <div className="col-sm-5">
                      <div className="print-quot3"></div>
                    </div>
                    <div class="print-quot3">
                      <div class="row">
                        <div class="col-sm-5 col-xs-4 pt-left">Doc No :</div>
                        <div class="col-sm-7 col-xs-8 pt-right">{podocno} </div>
                      </div>

                      <div class="row">
                        <div class="col-sm-5 col-xs-4 pt-left">Date :</div>
                        <div class="col-sm-7 col-xs-8 pt-right">{podate} </div>
                      </div>

                      <div class="row">
                        <div class="col-sm-5 col-xs-4 pt-left">Rev. No :</div>
                        <div class="col-sm-7 col-xs-8 pt-right">{porevno} </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row print-detail">
            <div class="col-sm-6 left1">
              <div class="print-detail1">
                <h5 style={{ fontSize: "14px" }}>Invoice To</h5>
                <h1>Entema Al Shamal Gen. cont. Est</h1>
                <p>
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
              <div class="print-detail3 pd3">
                <h1>Work Order</h1>
                <div class="row pd3-det">
                  <div class="col-sm-5 left1">
                    <div class="row">
                      <div class="col-sm-7 pri-field-head">Number :</div>
                      <div class="col-sm-5 pri-field-data pon">ponumber </div>
                    </div>

                    <div class="row">
                      <div class="col-sm-7 pri-field-head">Project:</div>
                      <div class="col-sm-5 pri-field-data">{poproject} </div>
                    </div>
                  </div>

                  <div class="col-sm-12">
                    <div class="row">
                      <div class="col-sm-6 pri-field-head">
                        Mode / Terms Payment :
                      </div>
                      <div class="col-sm-6 pri-field-data">
                        {popaymentmode}{" "}
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-7 ">
                    <div class="row">
                      <div class="col-sm-7 pri-field-head">Quatation Ref :</div>
                      <div
                        class="col-sm-8 pri-field-data"
                        style={{ marginLeft: "149px", marginTop: "-21px" }}
                      >
                        {poquotationref}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {status === "Not Approved" ? (
            <div id="watermark">Not Approved</div>
          ) : null}
          <div
            className="row"
            style={{ marginTop: "-20px", marginLeft: "0px    " }}
          >
            <div className="col-sm-8 left1">
              <div className="print-vendor">
                <div className="row">
                  <div className="col-sm-8 left1">
                    <div className="row ven-row">
                      <div
                        className="col-sm-4 pri-field-head pv3"
                        style={{ fontSize: "14px" }}
                      >
                        Vendor:
                      </div>
                      <div
                        className="col-sm-12"
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          marginLeft: "121px",
                          marginTop: "-21px",
                        }}
                      >
                        {povendor}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-8 left1">
                    <div className="row ven-row">
                      <div
                        className="col-sm-6 pri-field-head pv3"
                        style={{ fontSize: "14px" }}
                      >
                        Contact Person:
                      </div>
                      <div
                        className="col-sm-12"
                        style={{
                          fontSize: "14px",
                          //   fontWeight: "500",
                          marginLeft: "120px",
                          marginTop: "-21px",
                        }}
                      >
                        {pocpperson}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-8 left1">
                    <div className="row ven-row">
                      <div
                        className="col-sm-4 pri-field-head pv3"
                        style={{ fontSize: "14px" }}
                      >
                        Address:
                      </div>
                      <div
                        className="col-sm-12"
                        style={{
                          fontSize: "14px",
                          //   fontWeight: "500",
                          marginLeft: "120px",
                          marginTop: "-21px",
                        }}
                      >
                        {poadd}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-8 left1">
                    <div className="row ven-row">
                      <div
                        className="col-sm-4 pri-field-head pv3"
                        style={{ fontSize: "14px" }}
                      >
                        Ph.:
                      </div>
                      <div
                        className="col-sm-12"
                        style={{
                          fontSize: "14px",
                          //   fontWeight: "500",
                          marginLeft: "40px",
                          marginTop: "-21px",
                        }}
                      >
                        {pophone}
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-8 left1">
                    <div className="row ven-row">
                      <div
                        className="col-sm-4 pri-field-head pv3"
                        style={{
                          fontSize: "14px",
                          marginLeft: "177px",
                          marginTop: "-20px",
                        }}
                      >
                        Mobile No:
                      </div>
                      <div
                        className="col-sm-12"
                        style={{
                          fontSize: "14px",
                          //   fontWeight: "500",
                          marginLeft: "271px",
                          marginTop: "-21px",
                        }}
                      >
                        {pomobile}{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-8 left1">
                    <div className="row ven-row">
                      <div
                        className="col-sm-4 pri-field-head pv3"
                        style={{ fontSize: "14px" }}
                      >
                        Code:
                      </div>
                      <div
                        className="col-sm-12"
                        style={{
                          fontSize: "14px",
                          //   fontWeight: "500",
                          marginLeft: "53px",
                          marginTop: "-21px",
                        }}
                      >
                        {pocode}
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-8 left1">
                    <div className="row ven-row">
                      <div
                        className="col-sm-4 pri-field-head pv3"
                        style={{
                          fontSize: "14px",
                          marginLeft: "219px",
                          marginTop: "-20px",
                        }}
                      >
                        VAT:
                      </div>
                      <div
                        className="col-sm-12"
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          marginLeft: "271px",
                          marginTop: "-21px",
                        }}
                      >
                        {povat}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-8 left1">
                    <div className="row ven-row">
                      <div
                        className="col-sm-4 pri-field-head pv3"
                        style={{ fontSize: "14px" }}
                      >
                        Email ID:
                      </div>
                      <div
                        className="col-sm-12"
                        style={{
                          fontSize: "14px",
                          //   fontWeight: "500",
                          marginLeft: "121px",
                          marginTop: "-21px",
                        }}
                      >
                        {poemail}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 right1">
              <div className="print-detail39 pd3a">
                <h1>Work Schedule</h1>

                <div className="pvw">
                  <div className="row">
                    <div className="col-sm-6 pri-field-head">Start:</div>
                    <div className="col-sm-6 pri-field-data14">
                      {postartdate}26/021993
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-6 pri-field-head">Completion:</div>
                    <div className="col-sm-6 pri-field-data14">{poenddate}</div>
                  </div>

                  <div className="row">
                    <div className="col-sm-6 pri-field-head">Location:</div>
                    <div className="col-sm-6   pri-field-data14">
                      {polocation}{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="dash-pr">
                <div class="row">
                  <div class="col-sm-2 pri-field-head">
                    Description of Work:
                  </div>
                  <div class="col-sm-10 pri-field-data">{podesc} </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12">
              <div class="print-table1">
                <table>
                  <thead>
                    <tr>
                      <th>Sr#</th>
                      <th>Description </th>
                      <th> Unit</th>
                      <th>QTY</th>
                      <th>Unit rate (Sar)</th>
                      <th>Amount (sar)</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myDataSet.map((comment, index) => (
                      <tr>
                        <th scope="row" key={index}>
                          {comment.PO_ROW + 1}
                        </th>
                        <td>{comment.PO_DESC}</td>
                        <td>{comment.UNIT_DD}</td>
                        <td>{comment.QUANTITY}</td>
                        <td>{comment.UNIT_RATE}</td>
                        <td>{comment.UNIT_AMOUNT}</td>
                        <td>NA</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <div class="row mt-2">
                <div class="col-sm-5 pri-field-head">Mobilization Date:</div>
                <div class="col-sm-7 ">{pomobilizationdate} </div>
              </div>
            </div>

            <div class="col-6">
              <div class="print-total row mr-0">
                <div class="col-6 tot-left tl1">TOTAL sar</div>
                <div class="col-6 tot-right tr1" id="total">
                  {pototal}{" "}
                </div>

                <div class="col-6 col-xs-6 tot-left">
                  s.tAX/vat/rgst {pogst}{" "}
                </div>
                <div class="col-6 col-xs-6 tot-right">{pogst} </div>
                <div class="col-sm-6 col-xs-6 tot-left tl2">
                  gRAND tOTAL (sAR)
                </div>
                <div class="col-sm-6 col-xs-6 tot-right tr2" id="grandtotal">
                  {pograndtotal}{" "}
                </div>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12">
              <div class="print-total1">
                <h4>
                  <span>
                    TOTAL (IN WORDS ):
                    <span id="total_word" style={{ display: "inline" }}>
                      {toWords(pograndtotal)}
                    </span>{" "}
                    SAR{" "}
                    <span
                      id="total_decimal"
                      style={{ display: "inline" }}
                    ></span>
                    Only
                  </span>
                </h4>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12">
              <div class="dash-terms mt-0 pt-0">
                <h1 class="pl-0">INSTRUCTIONS:</h1>
                <p>
                  {" "}
                  1. Payment shall be made for the quantities executed as per
                  unit rates given above.
                  <br />
                  2. Work Order number and date must be quoted on all
                  correspondence.
                  <br />
                  3. This order is subject to the terms and conditions set out
                  on the face and Annexure -A
                  <br />
                  4. The acceptance copy must be signed by vender or by its
                  representative ( on vender’s behalf) on the face and Annexure
                  - A<br />
                  5. This Work Order is subject to the cancellation unless the
                  subcontractor returns one copy signed with confirmation that
                  all terms and conditions are accepted.
                  <br />
                  6. The following attachments form an integral part of this
                  work Order.
                </p>{" "}
              </div>
            </div>

            <div class="col-sm-12">
              <div class="dash-terms mt-0 pt-0">
                <h1 class="pl-0">Terms of delivery:</h1>{" "}
                <p>
                  1. Lubricants, top-up oil, repairs, daily maintenance,
                  Service. and Consumables of the Equipments shall be provide by
                  Vender.
                  <br />
                  2. In case of breakDown or Maintenance, Vwndor/Supplier shall
                  provide a replacement of equipment immediatly at no extra
                  cost.
                </p>{" "}
              </div>
            </div>

            <div class="col-sm-12">
              <div class="dash-terms mt-0 pt-0">
                <h1 class="pl-0">Terms &amp; Conditions:</h1>
                <p>
                  {" "}
                  1. Above rate is applicable for 10 hours per day, 6 days a
                  week, 260 hours per Month.
                  <br />
                  2. Working Duration: 2 Month Extandable.
                  <br />
                  3. Supply Food, accommodation &amp; Transportation scope
                  Entema al-shamal.
                  <br />
                  4. Above Rate is exclusive of VAT.
                  <br />
                  5. If you need any clarification on above matter or any
                  assistance please feel free to contract undersigned.
                  <br />
                  6. Vendor has to return the same purchase order to Entema
                  Al-shamal by Fax or Email after Confirmation Signature.
                </p>{" "}
              </div>
            </div>
          </div>

          <div class="bot-cl2">
            <h6 style={{ textAlign: "center" }}>Accepted by</h6>
            <div className="row">
              <div className="col-md-5 col-xs-6 bot-left">Signature</div>
              <div className="col-sm-7 col-xs-6 bot-right">{pocpperson}</div>
            </div>
            <div className="row">
              <div className="col-sm-5 col-xs-6 bot-left">Name &amp; Title</div>
              <div
                className="col-sm-6"
                style={{ textAlign: "center", fontSize: "13px" }}
              >
                {sigName}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-5 col-xs-6 bot-left">Date</div>
              <div className="col-sm-7 col-xs-6 bot-right">{podate}</div>
            </div>
          </div>

          <div class="bot-cl3">
            <h6>Issued by</h6>
            <h5>
              Authorised Signatory
              <br />
              (Entema Al Shamal Gen. cont. Est)
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PoPdf;
