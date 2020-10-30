<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="PayrollEmployeeLeave.aspx.cs" Inherits="LabMS.Navigation.Payroll.PayrollEmployeeLeave" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/payrollemployeeleave.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Payroll EmployeeLeave Detail Information</h5>
                    <asp:HiddenField ID="hdfwdid" runat="server" ClientIDMode="static" Value="0" />
                    <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                </div>
                <!-- Breadcrumb -->
            </div>
        </div>

        <div class="panel panel-default card-view panel-refresh" style="margin-top: 2%;">
            <div class="refresh-container" style="display: none;">
                <div class="la-anim-1">
                </div>
            </div>

            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Add EmployeeLeave Detail</legend>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Employee<samp style="color: Red">*</samp></label>
                                <select id="ddlemployee" class="form-control"></select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Pay Slip Detail<samp style="color: Red">*</samp></label>
                                <select id="ddlhead" class="form-control"></select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Present<samp style="color: Red">*</samp></label>
                                <input id="txtpresent" class="form-control" placeholder="Present" onfocus="allownumeric(this)" maxlength="2" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    WeeklyOff<samp style="color: Red">*</samp></label>
                                <input id="txtweeklyoff" class="form-control" placeholder="WeeklyOff" clientidmode="Static" onfocus="allownumeric(this)" maxlength="2" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Holidays<samp style="color: Red">*</samp></label>
                                <input id="txtholidays" class="form-control" placeholder="Holidays" onfocus="allownumeric(this)" maxlength="2" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    OnDuty<samp style="color: Red">*</samp></label>
                                <input id="txtonduty" class="form-control" placeholder="OnDuty" onfocus="allownumeric(this)" maxlength="2" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Absent<samp style="color: Red">*</samp></label>
                                <input id="txtabsent" class="form-control" placeholder="Absent" onfocus="allownumeric(this)" maxlength="2" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Unpaid<samp style="color: Red">*</samp></label>
                                <input id="txtunpaid" class="form-control" placeholder="Unpaid" onfocus="allownumeric(this);" maxlength="2" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    CasualLeave
                                    <samp style="color: Red">*</samp></label>
                                <input id="txtcasualleave" class="form-control" placeholder="CasualLeave" onfocus="allownumeric(this);" maxlength="2" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    EarnedLeave<samp style="color: Red"></samp></label>
                                <input id="txtearnedleave" class="form-control" placeholder="EarnedLeave" onfocus="allownumeric(this)" maxlength="2" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    SickLeave<samp style="color: Red"></samp></label>
                                <input id="txtsickleave" class="form-control" placeholder="SickLeave" onfocus="allownumeric(this)" maxlength="2" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    MaternityLeave<samp style="color: Red"></samp></label>
                                <input id="txtmaternityleave" class="form-control" placeholder="MaternityLeave" onfocus="allownumeric(this)" maxlength="2" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Restricted<samp style="color: Red"></samp></label>
                                <input id="txtrestricted" class="form-control" placeholder="Restricted" onfocus="allownumeric(this)" maxlength="2" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    ExtraWorking<samp style="color: Red"></samp></label>
                                <input id="txtextraworking" class="form-control" placeholder="ExtraWorking" onfocus="allownumeric(this)" maxlength="2" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    CompoffEarned<samp style="color: Red"></samp></label>
                                <input id="txtcompoffearned" class="form-control" placeholder="CompoffEarned" onfocus="allownumeric(this)" maxlength="2" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    CompoffAvailed<samp style="color: Red"></samp></label>
                                <input id="txtcompoffavailed" class="form-control" placeholder="CompoffEarned" onfocus="allownumeric(this)" maxlength="2" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Bereavementleave<samp style="color: Red"></samp></label>
                                <input id="txtbereavementleave" class="form-control" placeholder="Bereavementleave" onfocus="allownumeric(this)" maxlength="2" clientidmode="Static" />

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
                        <legend class="fieldSetLabel">Payroll EmployeeLeave Information Detail List</legend>
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

                <input type="button" id="btnadd" accesskey="A" class="btn btn-success btn-xs" value="Add EmployeeLeave" />
                <input type="button" id="btnclear" accesskey="C" class="btn btn-warning btn-xs" value="Clear" />
            </div>
        </div>
    </div>
</asp:Content>
