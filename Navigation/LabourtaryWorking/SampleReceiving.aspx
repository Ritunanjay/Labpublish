<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="SampleReceiving.aspx.cs" Inherits="ITHospital.Navigation.LabourtaryWorking.SampleReceiving" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/samplereceiving.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div id="EditHeadTitle" runat="server">
                    <div class="col-md-9">
                        <div class="formheadtitle">Labourtary Sample Receiving Detail </div>

                        <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdforderid" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfid" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                    </div>
                    <!-- Breadcrumb -->
                    <div class="col-md-3">
                        <input type="checkbox" value="urgent" class="" id="chckdoctor" />
                        <div class="formheadtitle">Doctor Detail</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel panel-default card-view panel-refresh" style="margin-top: 3%;">
           
                <div class="panel panel-success" style="font-size: small;margin-bottom: 0px;"> <marquee behavior="right" direction="right" scrollamount="5" style="color: #336699;text-shadow: -1px 20px 20px black;">Patient Detail : <i id="lnkname"></i>&nbsp;| &nbsp;<i id="lnkuhid"></i>&nbsp;| &nbsp;<i id="lnkpatientdetail"></i></marquee></div>

            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <fieldset class="fieldSetBorder" id="pnldoctor" style="display: none">
                        <legend class="fieldSetLabel">Doctor Detail Detail</legend>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label ">
                                    Reporting Doctor1</label>
                                <select id="ddldoctor" class="form-control">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label ">
                                    Reporting Doctor2</label>
                                <select id="ddldoctor1" class="form-control">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label ">
                                    Reporting Doctor3</label>
                                <select id="ddldoctor2" class="form-control">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label ">
                                    Reporting Doctor4</label>
                                <select id="ddldoctor3" class="form-control">
                                </select>
                            </div>
                        </div>

                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Sample Receiving Detail</legend>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    Sample Boy</label>
                                <select id="ddlsampleboy" class="form-control">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    SampleNo</label>
                                <input id="txtsampleno" class="form-control" value="" placeholder="Sample No" />
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label ">
                                    Collection Date</label>
                                <div class="input-group">
                                    <div class="input-group-btn">

                                        <input id="txtcollectiondate" class="form-control" readonly placeholder="mm/dd/yyyy" placeholder="Date" style="width: 50%;" />
                                        <input id="txtcollectiontime" class="form-control" placeholder="HH:mm" placeholder="Time" style="width: 50%;" />
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label ">
                                    Received Date</label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input id="txtreceiveddate" class="form-control" readonly placeholder="mm/dd/yyyy" placeholder="Date" style="width: 50%;" />
                                        <input id="txtreceivedtime" class="form-control" placeholder="HH:mm" placeholder="Time" style="width: 50%;" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    Reject Detail</label>
                                <input id="txtrejectdetail" class="form-control" value="" placeholder="Reject Status" />
                            </div>
                        </div>

                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Information About Sample Detail</legend>
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
                        <div class="col-md-12" style="overflow: scroll; height: 550px; width: 100%">
                            <div class="form-group">
                                <table class="table table-responsive table-stripped table-bordered" id="gvsamplecollection">
                                </table>
                            </div>
                        </div>
                    </fieldset>


                </div>
                <div class="col-md-12 fixbuttonsectionbuttom">
                    <div class="col-md-12 text-center">
                        <input type="button" id="btnadd" accesskey="S" class="btn btn-success btn-xs" value="Save Sample Receive" />
                        <input type="button" id="btnreset" accesskey="R" class="btn btn-warning btn-xs" value="Refresh" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--Barcode--->
    <div id="ModalBarcode" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h5 class="modal-title">Barcode</h5>
                </div>
                <div class="modal-body">
                    <fieldset class="fieldSetBorder" id="barcodeprint">
                        <legend class="fieldSetLabel">Barcode</legend>
                        <div class="col-md-12">
                            <div class="form-group">
                                <div class="col-md-12 col-sm-12 col-xs-12" id="img" style="display: inline;">
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>

            </div>
        </div>
    </div>
</asp:Content>
