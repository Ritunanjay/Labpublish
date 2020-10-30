<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="RadiologyModilityArrive.aspx.cs" Inherits="LabMS.Navigation.RadiologyWorking.RadiologyModilityArrive" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
  <script src="<%= ResolveClientUrl("~/project_js/modilityarrive.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div id="EditHeadTitle" runat="server">
                    <div class="col-md-9">
                        <div class="formheadtitle">Radiology Modility Arrive Detail </div>
                        <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdforderid" runat="server" ClientIDMode="Static" Value="0" />
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

        <div class="panel panel-default card-view panel-refresh" style="margin-top: 3%;">
            <div class="panel panel-success" style="font-size: small; margin-bottom: 0px;">
                <marquee behavior="alternate" direction="right" scrollamount="5" style="color: #336699; text-shadow: -1px 20px 20px black;">Patient Detail : <i id="lnkname"></i>&nbsp;| &nbsp;<i id="lnkuhid"></i>&nbsp;| &nbsp;<i id="lnkpatientdetail"></i></marquee>
            </div>

            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <div class="col-md-6">
                        <fieldset class="fieldSetBorder">
                            <legend class="fieldSetLabel">Radiology Modility Arrive Detail</legend>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Reporting Doctor1</label>
                                    <select id="ddldoctor" class="form-control">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Reporting Doctor2</label>
                                    <select id="ddldoctor1" class="form-control">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Reporting Doctor3</label>
                                    <select id="ddldoctor2" class="form-control">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Reporting Doctor4</label>
                                    <select id="ddldoctor3" class="form-control">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Reject Detail</label>
                                    <input id="txtrejectdetail" class="form-control" value="" placeholder="Reject Status" />
                                </div>
                            </div>

                        </fieldset>
                    </div>
                    <div class="col-md-6">
                        <fieldset class="fieldSetBorder">
                            <legend class="fieldSetLabel">Search Detail</legend>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="control-label ">
                                        From Date</label>
                                    <input id="txtfromdate" class="form-control" />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="control-label ">
                                        To Date</label>
                                    <input id="txttodate" class="form-control" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Advance Search Detail</label>
                                    <input id="txtpatientfilter" placeholder="Advance Search Here" class="form-control" />
                                </div>
                            </div>

                        </fieldset>
                    </div>
                    <div class="col-md-12">

                        <fieldset class="fieldSetBorder">
                            <legend class="fieldSetLabel">Information About Modility Detail</legend>

                            <div class="col-md-12" style="overflow: scroll; height: 550px; width: 100%">
                                <div class="form-group">
                                    <table class="table table-responsive table-stripped table-bordered" id="gvsamplecollection">
                                    </table>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                </div>
                <div class="col-md-12 fixbuttonsectionbuttom">
                    <div class="col-md-12 text-center">
                        <input type="button" id="btnadd" accesskey="S" class="btn btn-success btn-xs" value="Arrived" />
                        <input type="button" id="btnreset" accesskey="R" class="btn btn-warning btn-xs" value="Clear" />
                    </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
