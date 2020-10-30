<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="Userhome.aspx.cs" Inherits="ITHospital.Navigation.Dashboard.Userhome" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/userhome.js") %>"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid pt-25">
        <!-- Row -->

        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="panel panel-default card-view panel-refresh">
                    <div class="refresh-container">
                        <div class="la-anim-1"></div>
                    </div>
                    <div class="panel-heading">
                        <div class="pull-left">
                            <div class="dropdown">
                                <button aria-expanded="true" data-toggle="dropdown" class="btn btn-warning input-md  dropdown-toggle " type="button">Dashboard Filter [<i class="dashboard"></i>] <span class="caret"></span></button>
                                <ul role="menu" data-dropdown-in="rollIn" data-dropdown-out="rollOut" class="dropdown-menu mydashboardfilter">
                                    <li data-id="D"><a href="javascript:void();" clientidmode="static" style="font-weight: bolder; color: black">Today</a></li>
                                    <li data-id="W"><a clientidmode="static" href="javascript:void();" style="font-weight: bolder; color: black">Week</a></li>
                                    <li data-id="M"><a clientidmode="static" href="javascript:void();" style="font-weight: bolder; color: black">Month</a></li>
                                    <li data-id="Y"><a clientidmode="static" href="javascript:void();" style="font-weight: bolder; color: black">Year</a></li>
                                    <li data-id="C"><a clientidmode="static" href="javascript:void();" style="font-weight: bolder; color: black">Custom</a></li>
                                </ul>
                            </div>
                        </div>

                        <div class="pull-right">
                            <div>
                                <input type="text" readonly class="dashboardfromdate from-control input-xs" value="" /><input type="text" readonly class=" from-control input-xs dashboardtodate" value="" />
                            </div>

                        </div>
                        <div class="clearfix"></div>
                    </div>

                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div class="panel panel-default card-view pa-0">
                        <div class="panel-wrapper collapse in">
                            <div class="panel-body pa-0">
                                <div class="lnkcolor" style="animation-fill-mode: both; box-shadow: 0 0 12px 3px black;">
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-xs-6 text-center pl-0 pr-0 data-wrap-left">
                                                <span class="txt-light block counter"><span class="counter-anim dashboardbooking">0</span></span>
                                                <span class="weight-500 uppercase-font txt-light block">Booking</span>
                                            </div>
                                            <div class="col-xs-6 text-center  pl-0 pr-0 pt-25  data-wrap-right">
                                                <i class="fa fa-medkit txt-light data-right-rep-icon"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div class="panel panel-info card-view pa-0">
                        <div class="panel-wrapper collapse in">
                            <div class="panel-body pa-0">
                                <div class="lnkcolor" style="animation-fill-mode: both; box-shadow: 0 0 12px 3px black;">
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-xs-6 text-center pl-0 pr-0 data-wrap-left">
                                                <span class="txt-light block counter"><span class="counter-anim dashboardnewpatient">0</span></span>
                                                <span class="weight-500 uppercase-font txt-light block">New Patient</span>
                                            </div>
                                            <div class="col-xs-6 text-center  pl-0 pr-0 pt-25  data-wrap-right">
                                                <i class="fa fa-user txt-light data-right-rep-icon"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div class="panel panel-info card-view pa-0">
                        <div class="panel-wrapper collapse in">
                            <div class="panel-body pa-0">
                                <div class="lnkcolor" style="animation-fill-mode: both; box-shadow: 0 0 12px 3px black;">
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-xs-6 text-center pl-0 pr-0 data-wrap-left">
                                                <span class="txt-light block counter"><span class="counter-anim dashboardoldpatient">0</span></span>
                                                <span class="weight-500 uppercase-font txt-light block">Old Patient</span>
                                            </div>
                                            <div class="col-xs-6 text-center  pl-0 pr-0 pt-25  data-wrap-right">
                                                <i class="fa fa-user txt-light data-right-rep-icon"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div class="panel panel-default card-view pa-0">
                        <div class="panel-wrapper collapse in">
                            <div class="panel-body pa-0">
                                <div class="lnkcolor" style="animation-fill-mode: both; box-shadow: 0 0 12px 3px black;">
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-xs-6 text-center pl-0 pr-0 data-wrap-left">
                                                <span class="txt-light block counter"><span class="counter-anim dashboardbookingamount">0</span></span>
                                                <span class="weight-500 uppercase-font txt-light block">Booking Amount</span>
                                            </div>
                                            <div class="col-xs-6 text-center  pl-0 pr-0 pt-25  data-wrap-right">
                                                <i class="fa fa-rupee txt-light data-right-rep-icon"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div class="panel panel-default card-view pa-0">
                        <div class="panel-wrapper collapse in">
                            <div class="panel-body pa-0">
                                <div class="lnkcolor" style="animation-fill-mode: both; box-shadow: 0 0 12px 3px black;">
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-xs-6 text-center pl-0 pr-0 data-wrap-left">
                                                <span class="txt-light block counter"><span class="counter-anim dashboardcollection">0</span></span>
                                                <span class="weight-500 uppercase-font txt-light block">Collection</span>
                                            </div>
                                            <div class="col-xs-6 text-center  pl-0 pr-0 pt-25  data-wrap-right">
                                                <i class="fa fa-rupee txt-light data-right-rep-icon"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div class="panel panel-info card-view pa-0">
                        <div class="panel-wrapper collapse in">
                            <div class="panel-body pa-0">
                                <div class="lnkcolor" style="animation-fill-mode: both; box-shadow: 0 0 12px 3px black;">
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-xs-6 text-center pl-0 pr-0 data-wrap-left">
                                                <span class="txt-light block counter"><span class="counter-anim dashboardbalance">0</span></span>
                                                <span class="weight-500 uppercase-font txt-light block">Balance</span>
                                            </div>
                                            <div class="col-xs-6 text-center  pl-0 pr-0 pt-25  data-wrap-right">
                                                <i class="glyphicon glyphicon-hourglass txt-light data-right-rep-icon"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 
                <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div class="panel panel-info card-view pa-0">
                        <div class="panel-wrapper collapse in">
                            <div class="panel-body pa-0">
                                <div class="lnkcolor" style="animation-fill-mode: both; box-shadow: 0 0 12px 3px black;">
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-xs-6 text-center pl-0 pr-0 data-wrap-left">
                                                <span class="txt-light block counter"><span class="counter-anim dashboardreceipt">0</span></span>
                                                <span class="weight-500 uppercase-font txt-light block">Receipt</span>
                                            </div>
                                            <div class="col-xs-6 text-center  pl-0 pr-0 pt-25  data-wrap-right">
                                                <i class="glyphicon glyphicon-hourglass txt-light data-right-rep-icon"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div class="panel panel-info card-view pa-0">
                        <div class="panel-wrapper collapse in">
                            <div class="panel-body pa-0">
                                <div class="lnkcolor" style="animation-fill-mode: both; box-shadow: 0 0 12px 3px black;">
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-xs-6 text-center pl-0 pr-0 data-wrap-left">
                                                <span class="txt-light block counter"><span class="counter-anim dashboardrefund">0</span></span>
                                                <span class="weight-500 uppercase-font txt-light block">Refund</span>
                                            </div>
                                            <div class="col-xs-6 text-center  pl-0 pr-0 pt-25  data-wrap-right">
                                                <i class="glyphicon glyphicon-hourglass txt-light data-right-rep-icon"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div class="panel panel-info card-view pa-0">
                        <div class="panel-wrapper collapse in">
                            <div class="panel-body pa-0">
                                <div class="lnkcolor" style="animation-fill-mode: both; box-shadow: 0 0 12px 3px black;">
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-xs-6 text-center pl-0 pr-0 data-wrap-left">
                                                <span class="txt-light block counter"><span class="counter-anim dashboardsamplecollect">0</span></span>
                                                <span class="weight-500 uppercase-font txt-light block">Sample Collect</span>
                                            </div>
                                            <div class="col-xs-6 text-center  pl-0 pr-0 pt-25  data-wrap-right">
                                                <i class="fa fa-flask txt-light data-right-rep-icon"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                  <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div class="panel panel-info card-view pa-0">
                        <div class="panel-wrapper collapse in">
                            <div class="panel-body pa-0">
                                <div class="lnkcolor" style="animation-fill-mode: both; box-shadow: 0 0 12px 3px black;">
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-xs-6 text-center pl-0 pr-0 data-wrap-left">
                                                <span class="txt-light block counter"><span class="counter-anim dashboardsamplereceive">0</span></span>
                                                <span class="weight-500 uppercase-font txt-light block">Sample Receive</span>
                                            </div>
                                            <div class="col-xs-6 text-center  pl-0 pr-0 pt-25  data-wrap-right">
                                                <i class="fa fa-flask txt-light data-right-rep-icon"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <div class="panel panel-default card-view panel-refresh" style="box-shadow: 0 0 9px 2px black;">
                        <div class="refresh-container">
                            <div class="la-anim-1"></div>
                        </div>
                        <div class="panel-heading" style="display: none">
                            <div class="pull-left">
                                <h6 class="panel-title txt-dark">Billing Information Detail</h6>
                            </div>
                            <div class="pull-right">
                                <a href="#" class="pull-left inline-block refresh mr-15 lnkbilling">
                                    <i class="zmdi zmdi-replay"></i>
                                </a>

                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <div class="panel-wrapper collapse in">
                            <div class="panel-body">
                                <div>

                                    <div id="chartContainer" style="height: 300px; width: 100%;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <div class="panel panel-default card-view panel-refresh" style="box-shadow: 0 0 9px 2px black;">
                        <div class="refresh-container">
                            <div class="la-anim-1"></div>
                        </div>
                        <div class="panel-heading" style="display: none">
                            <div class="pull-left">
                                <h6 class="panel-title txt-dark">Report Information Detail</h6>
                            </div>
                            <div class="pull-right">
                                <a href="#" class="pull-left inline-block refresh mr-15 lnkreporting">
                                    <i class="zmdi zmdi-replay"></i>
                                </a>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <div class="panel-wrapper collapse in">
                            <div class="panel-body">
                                <div>
                                    <div id="chartContainernew" style="height: 300px; width: 100%;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Row -->
        <!-- Row -->
        <div class="row" style="display: none">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <div class="panel panel-default card-view panel-refresh">
                    <div class="refresh-container">
                        <div class="la-anim-1"></div>
                    </div>
                    <div class="panel-heading">
                        <div class="pull-left">
                            <h6 class="panel-title txt-dark">Patient Test Detail</h6>
                        </div>
                        <div class="pull-right">
                            <a href="#" class="pull-left inline-block refresh mr-15">
                                <i class="zmdi zmdi-replay"></i>
                            </a>

                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="panel-wrapper collapse in">
                        <div class="panel-body">
                            <div>

                                <div id="Div1" style="height: 300px; width: 100%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="panel-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Booking Detail</legend>
                        <div class="col-md-12" style="overflow: scroll; height: auto; width: 100%">
                            <div class="form-group">
                                <table class="table table-responsive table-stripped table-bordered" id="gvbill">
                                </table>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>

    </div>
       <script src="<%= ResolveClientUrl("~/Admin/JSData/jshome_user_dashboard_data.js") %>"></script>

</asp:Content>
