<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="CentreInformation.aspx.cs" Inherits="LabMS.Navigation.CentreInformation.CentreInformation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/centreinformation.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid pt-25">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="panel-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Centre/Franchise Account Detail</legend>
                        <div class="col-md-12" style="overflow: scroll; height: auto; width: 100%">
                            <div class="form-group">
                                <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="panel panel-default card-view panel-refresh">
                                        <div class="refresh-container">
                                            <div class="la-anim-1"></div>
                                        </div>
                                        <div class="panel-heading">
                                            <div class="pull-left">
                                                <h6 class="panel-title txt-dark">Centre Booking Information</h6>
                                            </div>

                                            <div class="clearfix"></div>
                                        </div>

                                        <div class="col-lg-12">
                                            <div class="panel panel-default card-view">
                                                <div class="panel-heading">
                                                    <div class="pull-left">
                                                        <h6 class="panel-title txt-dark">bar Chart</h6>
                                                    </div>
                                                    <div class="clearfix"></div>
                                                </div>
                                                <div class="panel-wrapper collapse in">
                                                    <div id="morris_extra_bar_chart" class="morris-chart" style="position: relative; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div class="panel panel-default card-view">
                                                <div class="panel-heading">
                                                    <div class="pull-left">
                                                        <h6 class="panel-title txt-dark">user statistics</h6>
                                                    </div>

                                                    <div class="clearfix"></div>
                                                </div>
                                                <div class="panel-wrapper collapse in">
                                                    <div class="panel-body">
                                                        <div id="morris_extra_line_chart" class="morris-chart" style="height: 293px; position: relative; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="panel-wrapper collapse in">
                                            <div class="panel-body">
                                                <div>
                                                    <canvas id="chart_2"></canvas>
                                                </div>
                                                <div class="label-chatrs mt-30">
                                                    <div class="inline-block mr-15">
                                                        <span class="clabels inline-block bg-yellow mr-5"></span>
                                                        <span class="clabels-text font-12 inline-block  capitalize-font">OPD</span>
                                                    </div>
                                                    <div class="inline-block mr-15">
                                                        <span class="clabels inline-block bg-red mr-5"></span>
                                                        <span class="clabels-text font-12 inline-block  capitalize-font">IPD</span>
                                                    </div>
                                                    <div class="inline-block">
                                                        <span class="clabels inline-block bg-green mr-5"></span>
                                                        <span class="clabels-text font-12 inline-block  capitalize-font">Discharge</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="panel-wrapper collapse in">
                                            <div class="panel-body">
                                                <div>

                                                    <div id="chartContainer" style="height: auto; width: 100%;"></div>
                                                </div>
                                            </div>
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

</asp:Content>
