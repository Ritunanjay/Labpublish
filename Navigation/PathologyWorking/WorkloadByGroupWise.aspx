<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="WorkloadByGroupWise.aspx.cs" Inherits="LabMS.Navigation.PathologyWorking.WorkloadByGroupWise" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
 <script src="<%= ResolveClientUrl("~/project_js/workloadbygroupwise.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div id="EditHeadTitle" runat="server">
                    <div class="col-md-9">
                        <div class="formheadtitle">Pathology WorkLoad Detail </div>
                           <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdforderid" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfid" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                    </div>
                    <!-- Breadcrumb -->
                    <div class="col-md-3"><a href='javascript:void();' style="color:white"><i class="fa fa-refresh fa-spin lnkrefreshworkload" ></i> Refresh Workload</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel panel-default card-view panel-refresh" style="margin-top: 3%;">

            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Booking Filter Detail</legend>
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
                         <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    Department Group</label>
                                <select id="ddlgroup" class="form-control"  >
                                </select>
                            </div>
                        </div> <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    Report Status</label>
                                <select id="ddlstatus" class="form-control"  >
                                    <option value="A">All</option>
                                    <option value="B">Not Fill</option>
                                    <option value="I">InComplete</option>
                                    <option value="C">Complete</option>
                                    <option value="V">Validate</option>
                                    <option value="P">Print</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label ">
                                    Advance Search Detail</label>
                                <input id="txtpatientfilter" placeholder="Advance Search Here" class="form-control" />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Pathology Workload Detail</legend>

                        <div class="col-md-12" style="overflow: scroll; height: auto; width: 100%">
                            <div class="form-group">
                                <table class="table table-responsive table-stripped table-bordered" id="gvpathology">
                                </table>
                            </div>
                        </div>
                    </fieldset>


                </div>
                
            </div>
        </div>
    </div>
    <!--Worksheet--->
 
</asp:Content>


