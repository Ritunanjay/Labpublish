<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="VoucherDetail.aspx.cs" Inherits="LabMS.Navigation.Billing.VoucherDetail" %>

<%@ Register Src="~/CommonDetail/Payment.ascx" TagPrefix="uc1" TagName="Payment" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/payment.js") %>"></script>
    <script src="<%= ResolveClientUrl("~/project_js/voucherdetail.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Voucher Receipt Information Detail</h5>
                </div>
                <!-- Breadcrumb -->
            </div>
        </div>

        <div class="panel panel-default card-view panel-refresh" style="margin-top: 3%; height: 100%">
            <div class="refresh-container" style="display: none;">
                <div class="la-anim-1">
                </div>
            </div>

            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Add New Voucher Information Detail</legend>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Centre<samp style="color: Red">*</samp></label>
                                <asp:HiddenField ID="hdfvoucherid" runat="server" ClientIDMode="static" Value="0" />
                                <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                                <select id="ddlcentre" class="form-control"></select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    MainCentre<samp style="color: Red">*</samp></label>
                                <select id="ddlrefcentre" class="form-control"></select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Voucher Type<samp style="color: Red">*</samp></label>
                                <select id="ddlvouchertype" class="form-control"></select>

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Amount Paid<samp style="color: Red">*</samp></label>
                                <input id="txtpaid" class="form-control" placeholder="Paid Amount" disabled="disabled" value="0" onfocus="allownumericwithoutdecimal(this);" clientidmode="Static" />

                            </div>
                        </div>
                         <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Status<samp style="color: Red">*</samp></label>
                                <select id="ddlstatus" class="form-control" clientidmode="Static">
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                        </div>
                         <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Authorized By<samp style="color: Red">*</samp></label>
                                <select id="ddlauthorizedby" class="form-control"></select>
                             </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Voucher Date/Time<samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input id="txtvoucherdate" class="form-control" placeholder="Date" style="width:50%" disabled="disabled" onfocus="uppercase(this);" clientidmode="Static" />
                                        <input id="txttime" class="form-control" placeholder="Time" disabled="disabled" style="width:50%" onfocus="uppercase(this);" value="00:00" clientidmode="Static" />
                                    </div>
                                </div>
                            </div>
                        </div>
                      
                       
                       

                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Voucher Information Detail List</legend>
                        <div class="col-md-12" style="width: 100%; overflow: scroll">
                            <table id="gvvoucher" class="table table-bordered dt-responsive" style="width: 100%;">
                            </table>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>

        <!--button section --->
        <div class="col-md-12 fixbuttonsectionbuttom">
            <div class="col-md-12 text-center">

                 <input type="button" id="btnpayment" accesskey="R" class="btn btn-info btn-xs lnkpayment" value="Payment Here" />
               <input type="button" id="btnadd" accesskey="A" class="btn btn-success btn-xs" value="Add Voucher" />
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

