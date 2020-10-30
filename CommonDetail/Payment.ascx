<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Payment.ascx.cs" Inherits="LabMS.CommonDetail.Payment" %>
<input type="button" id="btnpaymentcheck" class="btn btn-warning btn-xs" value="CheckDetail" />
<div class="row">
    <div class="col-md-6">

        <fieldset class="fieldSetBorder">
            <legend class="fieldSetLabel">Cash 
                            <input id="chckcash" class="form-control" type="checkbox" clientidmode="Static" /></legend>
            <div class="col-md-6 pnlcash" style="display: none">
                <div class="form-group">
                    <label class="control-label">
                        Cash Amount
                                    <samp style="color: Red"></samp>
                    </label>
                    <input id="txtcashamount" class="form-control" type="text" placeholder="Cash Amount" value="0" clientidmode="Static" />

                </div>
            </div>
        </fieldset>
        <fieldset class="fieldSetBorder">
            <legend class="fieldSetLabel">Card
                            <input id="chckcard" class="form-control" type="checkbox" clientidmode="Static" /></legend>
            <div class="pnlcard" style="display: none">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="control-label">
                            Card Amount
                                    <samp style="color: Red"></samp>
                        </label>
                        <input id="txtcardamount" class="form-control" type="text" placeholder="Card Amount" value="0" clientidmode="Static" />

                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="control-label">
                            Card Number
                                    <samp style="color: Red"></samp>
                        </label>
                        <input id="txtcardno" class="form-control" type="text" placeholder="Card No" value="0" clientidmode="Static" />

                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="control-label">
                            Card Holder Name
                                    <samp style="color: Red"></samp>
                        </label>
                        <input id="txtcardholdername" class="form-control" type="text" placeholder="Card Holder Name" value="0" clientidmode="Static" />

                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="control-label">
                            Bank
                                    <samp style="color: Red"></samp>
                        </label>
                        <select id="ddlcardbank" class="form-control" clientidmode="Static">
                        </select>

                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="control-label">
                            Date
                                    <samp style="color: Red"></samp>
                        </label>
                        <input id="txtcarddate" class="form-control" type="text" placeholder="Card Date" value="0" clientidmode="Static" />

                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="control-label">
                            Transaction No
                                    <samp style="color: Red"></samp>
                        </label>
                        <input id="txtcardtransactionno" class="form-control" type="text" placeholder=" Transaction No" value="0" clientidmode="Static" />

                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="control-label">
                            Machine No
                                    <samp style="color: Red"></samp>
                        </label>
                        <select id="ddlcardmachine" class="form-control" clientidmode="Static">
                        </select>

                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    <div class="col-md-6">

        <fieldset class="fieldSetBorder">
            <legend class="fieldSetLabel">Cheque 
                            <input id="chckcheque" class="form-control" type="checkbox" clientidmode="Static" /></legend>
            <div class="pnlcheque" style="display: none">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="control-label">
                            Cheque Amount
                                    <samp style="color: Red"></samp>
                        </label>
                        <input id="txtchequeamount" class="form-control" type="text" placeholder="Cheque Amount" value="0" clientidmode="Static" />

                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="control-label">
                            Cheque No
                                    <samp style="color: Red"></samp>
                        </label>
                        <input id="txtchequeno" class="form-control" type="text" placeholder="Cheque no" value="0" clientidmode="Static" />

                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="control-label">
                            Bank
                                    <samp style="color: Red"></samp>
                        </label>
                        <select id="ddlchequebank" class="form-control" clientidmode="Static">
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="control-label">
                            Date
                                    <samp style="color: Red"></samp>
                        </label>
                        <input id="txtchequedate" class="form-control" type="text" placeholder="Cheque Date" value="0" clientidmode="Static" />

                    </div>
                </div>
            </div>
        </fieldset>
        <fieldset class="fieldSetBorder">
            <legend class="fieldSetLabel">E-Wallet
                            <input id="chckewallet" class="form-control" type="checkbox" clientidmode="Static" /></legend>
            <div class="pnlewallet" style="display: none">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="control-label">
                            E-Wallet Amount
                                    <samp style="color: Red"></samp>
                        </label>
                        <input id="txtewalletamount" class="form-control" type="text" placeholder="E-Wallet Amount" value="0" clientidmode="Static" />

                    </div>
                </div>

                <div class="col-md-4">
                    <div class="form-group">
                        <label class="control-label">
                            Detail
                                    <samp style="color: Red"></samp>
                        </label>
                        <input id="txtdetail" class="form-control" type="text" placeholder="Detail" value="0" clientidmode="Static" />

                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="control-label">
                            E-Wallet Type
                                    <samp style="color: Red"></samp>
                        </label>
                        <select id="ddlewallettype" class="form-control" clientidmode="Static">
                        </select>

                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="control-label">
                            Date
                                    <samp style="color: Red"></samp>
                        </label>
                        <input id="txtewalletdate" class="form-control" type="text" placeholder="E-Wallet Date" value="0" clientidmode="Static" />

                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="control-label">
                            Transaction No
                                    <samp style="color: Red"></samp>
                        </label>
                        <input id="txtewallettransactionno" class="form-control" type="text" placeholder="Transaction No" value="0" clientidmode="Static" />

                    </div>
                </div>
            </div>
        </fieldset>
    </div>
</div>
