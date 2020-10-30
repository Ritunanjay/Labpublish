<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="PayrollEmployeeDetail.aspx.cs" Inherits="LabMS.Navigation.Payroll.PayrollEmployeeDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/payrollemployeedetail.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Employee Payroll Detail</h5>
                </div>
                <!-- Breadcrumb -->
            </div>
        </div>
        <div class="panel panel-default card-view panel-refresh" style="margin-top: 3%;">
            <div class="refresh-container" style="display: none;">
                <div class="la-anim-1">
                </div>
            </div>

            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Add Employee Payment Detail</legend>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Employee<samp style="color: Red">*</samp></label>
                                <asp:HiddenField ID="hdfheadid" runat="server" ClientIDMode="static" Value="0" />
                                <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                                <select id="ddlemployee" class="form-control" clientidmode="Static">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Payment Mode<samp style="color: Red">*</samp></label>
                                <select id="ddlhead" class="form-control" clientidmode="Static">
                                </select>

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Basic Salary<samp style="color: Red">*</samp></label>
                                <input id="txtbasicsalary" class="form-control" onfocus="allownumeric(this)" placeholder="Basic Salary" value="0" maxlength="5" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Bank Name<samp style="color: Red">*</samp></label>
                                <input id="txtbankname" class="form-control" onfocus="titlecase(this)" placeholder="Bank Name" value="" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Account No<samp style="color: Red">*</samp></label>
                                <input id="txtaccountno" class="form-control" placeholder="A/c No" value="" clientidmode="Static" />

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
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Employee Payroll Information Detail</legend>
                        <div class="col-md-12" style="overflow: scroll">
                            <table id="gv" class="table table-striped table-hover table-bordered dt-responsive" style="width: 100%;">
                            </table>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>

        <!--button section --->
        <div class="col-md-12 fixbuttonsectionbuttom">
            <div class="col-md-12 text-center">

                <input type="button" id="btnadd" class="btn btn-success btn-xs" value="Add Employee Detail" accesskey="A" />
                <input type="button" id="btnclear" class="btn btn-warning btn-xs" value="Clear" accesskey="C" />
            </div>
        </div>
    </div>
    <!--Modal Popup for Chief Complaint-->

</asp:Content>
