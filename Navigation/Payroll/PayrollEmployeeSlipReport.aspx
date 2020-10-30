<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="PayrollEmployeeSlipReport.aspx.cs" Inherits="LabMS.Navigation.Payroll.PayrollEmployeeSlipReport" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
  <script src="<%= ResolveClientUrl("~/project_js/payrollemployeeslipreport.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div id="EditHeadTitle" runat="server">
                    <div class="col-md-9">
                        <div class="formheadtitle">Employee Salary Slip Detail </div>
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
                        <legend class="fieldSetLabel">Search SalarySlip Detail</legend>
                       
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label ">
                                    Search Slip Detail</label>
                                <input id="txtemployeeslip" placeholder=" Advance Search Here" class="form-control" />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">EmployeeSlip List</legend>

                        <div class="col-md-12" style="overflow: scroll; height: auto; width: 100%">
                            <div class="form-group">
                                <table class="table table-responsive table-stripped table-bordered" id="gv">
                                </table>
                            </div>
                        </div>
                    </fieldset>


                </div>

            </div>
        </div>
    </div>
</asp:Content>
