<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="DigitalCardRefund.aspx.cs" Inherits="LabMS.Navigation.DigitalCard.DigitalCardRefund" %>

<%@ Register Src="~/CommonDetail/Payment.ascx" TagPrefix="uc1" TagName="Payment" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/payment.js") %>"></script>
    <script src="<%= ResolveClientUrl("~/project_js/digitalcardrefund.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Digital Card Information Detail</h5>
                </div>
                <!-- Breadcrumb -->
            </div>
        </div>

        <div class="panel panel-default card-view panel-refresh" style="margin-top: 3%; height: auto">
            <div class="refresh-container" style="display: none;">
                <div class="la-anim-1">
                </div>
            </div>

            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Search Panel</legend>
                        <div class="col-md-12">
                            <div class="form-group">
                                <fieldset class="fieldSetBorder">
                                    <legend class="fieldSetLabel">Search Patient Detail</legend>
                                    <div class="input-group">
                                        <div class="input-group-btn">
                                            <select id="ddlfilteration" class="form-control" style="width: 25%">
                                                <option value="0">Today's Patients</option>
                                                <option value="1">All Patients</option>
                                            </select>
                                            <asp:HiddenField ID="hdfpatientid" Value="0" runat="server" ClientIDMode="Static" />
                                            <asp:HiddenField ID="hdfreceiptid" Value="0" runat="server" ClientIDMode="Static" />
                                            <asp:HiddenField ID="hdfrecordid" Value="0" runat="server" ClientIDMode="Static" />
                                            <input id="txtsearchpatient" autocomplete="off" class="form-control input-sm"
                                                placeholder=" UHID./Patient Name: " clientidmode="Static" style="width: 50%" />
                                            <input type="text" id="txtregdate" disabled="disabled" placeholder="DD/MM/YYYY" class="form-control" style="width: 12%" />
                                            <input type="text" id="txtregtime" disabled="disabled" placeholder="HH:mm" class="form-control" style="width: 12%" />
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>

                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Digital Card Information Detail</legend>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label mb-10">
                                    UHID<samp style="color: Red">*</samp></label>
                                <asp:HiddenField ID="hdfdigitalid" runat="server" ClientIDMode="static" Value="0" />
                                <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                                <input id="txtuhid" disabled="disabled" placeholder="UHID" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label mb-10">
                                    Patient Name<samp style="color: Red"></samp></label>
                                <input id="txtpatientname" disabled="disabled" placeholder="Patient Name" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label mb-10">
                                    Mobile<samp style="color: Red">*</samp></label>
                                <input id="txtmobile" disabled="disabled" placeholder="Mobile" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label mb-10">
                                    Available Balance<samp style="color: Red">*</samp></label>
                                <input id="txtbalance" disabled="disabled" placeholder="Balance" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label mb-10">
                                    Amount Paid<samp style="color: Red">*</samp></label>
                                <input id="txtpaid" class="form-control" placeholder="Paid Amount" disabled="disabled" value="0" onfocus="allownumericwithoutdecimal(this);" clientidmode="Static" />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label mb-10">
                                    Status<samp style="color: Red">*</samp></label>
                                <select id="ddlstatus" class="form-control" clientidmode="Static">
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Digital Information Detail List</legend>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    From Date</label>
                                <input id="txtfromdate" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    To Date</label>
                                <input id="txttodate" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label ">
                                    Other Search Detail</label>
                                <input id="txtpatientfilter" placeholder=" Advance Search Here" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-12" style="width: 100%; overflow: scroll">
                            <table id="gv" class="table table-bordered dt-responsive" style="width: 100%;">
                            </table>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>

        <!--button section --->
        <div class="col-md-12 fixbuttonsectionbuttom">
            <div class="col-md-12 text-center">
                 <input type="button" id="btnpayment" accesskey="P" class="btn btn-info btn-xs lnkpayment" value="Payment Here" />
                <input type="button" id="btnadd" accesskey="A" class="btn btn-success btn-xs" value="Submit Digital Payment" />
               <input type="button" id="btnclear" accesskey="C" class="btn btn-warning btn-xs" value="Clear" />
            </div>
        </div>
    </div>
    <!--Paymode--->
    <div id="ModalPayment" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h5 class="modal-title">Payment Here</h5>
                </div>
                <div class="modal-body">
                    <uc1:Payment runat="server" ID="Payment" />
                </div>
                <%--<div class="modal-footer">
                    <hr />
                  
                      <input type="button" class="btn btnsubmitreset btn-rounded btn-xs" data-dismiss="modal" value="X" />
                </div>--%>
            </div>
        </div>
    </div>

</asp:Content>
