<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="CentreAccountDashboard.aspx.cs" Inherits="LabMS.Navigation.CentreInformation.CentreAccountDashboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/centreaccountdashboard.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid" style="zoom: 95%">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div id="EditHeadTitle" runat="server">
                    <div class="col-md-9">
                        <div class="formheadtitle">Centre Account Dashboard </div>
                        <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
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

        <div class="panel panel-default card-view panel-refresh" style="margin-top: 1%;">

            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Centre Filter Filter Detail</legend>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label ">
                                    Centre</label>
                                <select id="ddlcentre" class="form-control">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">

                                <input id="btnbookingdetail" class="btn btn-success" value="View all Voucher/Booking" type="button" />
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="col-lg-12">
                                <div class="panel panel-default card-view">
                                    <div class="panel-heading">
                                        <div class="pull-left">
                                            <h6 class="panel-title txt-dark">Centre Chart</h6>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="panel-wrapper collapse in">
                                        <div id="morris_extra_bar_chart" class="morris-chart" style="position: relative; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="col-lg-12">
                                <div class="panel panel-default card-view">
                                    <div class="panel-heading">
                                        <div class="pull-left">
                                            <h6 class="panel-title txt-dark">Centre Chart</h6>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="panel-wrapper collapse in">
                                        <div id="morris_donut_chart" class="morris-chart donut-chart">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
    <div id="ModalCentreAccountInformation" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h5 class="modal-title">All Centre Booking Detail [<i class="lnkcentrename"></i>]</h5>
                </div>
                <div class="modal-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Centre/Franchise Account Detail</legend>
                        <div class="col-md-12" style="overflow: scroll; height: auto; width: 100%">
                            <div class="form-group">
                                <table class="table table-responsive table-stripped table-bordered" id="gvcentrebooking">
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
