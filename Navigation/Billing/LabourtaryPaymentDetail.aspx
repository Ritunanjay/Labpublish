<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="LabourtaryPaymentDetail.aspx.cs" Inherits="LabMS.Navigation.Billing.LabourtaryPaymentDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/labourtarypaymentdetail.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div id="EditHeadTitle" runat="server">
                    <div class="col-md-9">
                        <div class="formheadtitle">Booking All Payment Detail </div>
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

            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Booking Payment Detail Search</legend>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    From Date</label>
                                <input id="txtfromdate" class="form-control" readonly />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    To Date</label>
                                <input id="txttodate" class="form-control" readonly />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label ">
                                    Other Search Detail</label>
                                <input id="txtpatientfilter" placeholder=" Advance Search Here" class="form-control" />
                            </div>
                        </div>
                         <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                 Payment Type</label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlpaymenttype" class="form-control" style="width: 100%;" >
                                        <option value="0">All</option>    
                                         <option value="Receipt">Receipt</option>    
                                         <option value="Refund">Refund</option>    
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Booking Receipt Detail</legend>

                        <div class="col-md-12" style="overflow: scroll; height: 550px; width: 100%">
                            <div class="form-group">
                                <table class="table table-responsive table-stripped table-bordered" id="gvbill">
                                </table>
                            </div>
                        </div>
                    </fieldset>


                </div>
                <div class="col-md-12 fixbuttonsectionbuttom" style="display: none">
                    <div class="col-md-12 text-center">
                        
                        <input type="button" id="btnpayment" accesskey="P" class="btn btn-info btn-xs lnkpayment" value="Payment Here" />
                        <input type="button" id="btnadd" accesskey="A" class="btn btn-success btn-xs" value="Paid Receipt" />
                        <input type="button" id="btnreset" accesskey="C" class="btn btn-warning btn-xs" value="Clear" />

                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
