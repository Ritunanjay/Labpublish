<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="LabourtaryRefund.aspx.cs" Inherits="LabMS.Navigation.Billing.LabourtaryRefund" %>

<%@ Register Src="~/CommonDetail/Payment.ascx" TagPrefix="uc1" TagName="Payment" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/payment.js") %>"></script>
    <script src="<%= ResolveClientUrl("~/project_js/labourtaryrefund.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div id="EditHeadTitle" runat="server">
                    <div class="col-md-9">
                        <div class="formheadtitle">Pathology Refund Detail </div>
                        <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfbillid" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfreceiptid" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfid" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                    </div>
                    <!-- Breadcrumb -->
                    <div class="col-md-3">
                    </div>
                </div>
            </div>
        </div>

        <div class="panel panel-default card-view panel-refresh" style="margin-top: 2%;">
        
                <div class="panel panel-success" style="font-size: small;margin-bottom: 0px;"> <marquee behavior="right" direction="right" scrollamount="5" style="color: #336699;text-shadow: -1px 20px 20px black;">Patient Detail : <i id="lnkname"></i>&nbsp;| &nbsp;<i id="lnkuhid"></i>&nbsp;| &nbsp;<i id="lnkpatientdetail"></i></marquee></div>

            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Receipt Detail</legend>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    Authentication</label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlauthority" class="form-control" style="width: 100%">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-1">
                            <div class="form-group">
                                <label class="control-label ">
                                    Net Amount</label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input id="txtnet" class="form-control" style="width: 100%;" value="0" placeholder="Net (Rs.)" disabled="disabled" onfocus="allownumericwithoutdecimal(this);" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    PayMode</label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlpaymode" class="form-control" accesskey="P" style="width: 100%">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    Paid/Balance</label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input id="txtpaid" class="form-control" style="width: 50%;" value="0" placeholder="Paid (Rs.)" disabled="disabled" onfocus="allownumericwithoutdecimal(this);" />
                                        <input id="txtbalance" class="form-control" style="width: 50%;" value="0" placeholder="Balance (Rs.)" disabled="disabled" onfocus="allownumericwithoutdecimal(this);" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label ">
                                    Date/Time</label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input type="text" id="txtregdate" disabled="disabled" placeholder="DD/MM/YYYY" class="form-control" style="width: 50%" />
                                        <input type="text" id="txttime" disabled="disabled" placeholder="HH:mm" class="form-control" style="width: 50%" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    Digital Card Balance</label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input id="txtdigitalcardbalance" class="form-control" placeholder="Digital Card" disabled="disabled" style="width: 100%" />
                                        <button class="btn btn-primary btn-icon-anim btn-square btn-sm btn" style="height: 80%; display: none;"><i class="icon-user"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label ">
                                    Remark</label>
                                <div class="input-group">
                                    <div class="input-group-btn">

                                        <input type="text" id="txtremark" class="form-control" style="width: 100%" placeholder="Remark" />
                                    </div>
                                </div>
                            </div>
                        </div>
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
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Pathology Bill Detail</legend>

                        <div class="col-md-12" style="overflow: scroll; height: auto; width: 100%">
                            <div class="form-group">
                                <table class="table table-responsive table-stripped table-bordered" id="gvbill">
                                </table>
                            </div>
                        </div>
                    </fieldset>


                </div>
                <div class="col-md-12 fixbuttonsectionbuttom">
                    <div class="col-md-12 text-center">
                        <input type="button" id="btnpayment" accesskey="P" class="btn btn-info btn-xs lnkpayment" value="Payment Here" />
                        <input type="button" id="btnadd" accesskey="S" class="btn btn-success btn-xs" value="Submit Refund" />
                        <input type="button" id="btnreset" accesskey="R" class="btn btn-warning btn-xs" value="Refresh" />

                    </div>
                </div>
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
    <div id="ModalReceipt" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h5 class="modal-title">Refund Detail Here</h5>
                </div>
                <div class="modal-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Refund Detail</legend>

                        <div class="col-md-12" style="overflow: scroll; height: auto; width: 100%">
                            <div class="form-group">
                                <table class="table table-responsive table-stripped table-bordered" id="gvrefund">
                                </table>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <%--<div class="modal-footer">
                    <hr />
                  
                      <input type="button" class="btn btnsubmitreset btn-rounded btn-xs" data-dismiss="modal" value="X" />
                </div>--%>
            </div>
        </div>
    </div>
</asp:Content>
