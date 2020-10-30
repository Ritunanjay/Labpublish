<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="BarcodePrint.aspx.cs" Inherits="ITHospital.Navigation.BarcodePrint.BarcodePrint" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/barcode.js") %>"></script>
    <script type="text/javascript">
        function PrintDiv() {
            var contents = $('#barcodeprint').html();
            var frame1 = document.createElement('iframe');
            frame1.name = "frame1";
            frame1.style.position = "absolute";
            frame1.style.top = "-1000000px";
            document.body.appendChild(frame1);
            var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
            frameDoc.document.open();
            frameDoc.document.write('<html><head>');
            frameDoc.document.write('</head><body>');
            frameDoc.document.write(contents);
            frameDoc.document.write('</body></html>');
            frameDoc.document.close();
            setTimeout(function () {
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                document.body.removeChild(frame1);
            }, 500);
            return false;
        }
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script type="text/javascript">
        $(function () { initdropdown(); })
        function initdropdown() { $(".select2").select2(); }
    </script>
    <script type="text/javascript">
        Sys.Application.add_load(initdropdown);
    </script>
    <div class="container-fluid">
        <!--Head section --->

        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Create Images Barcode Detail</h5>
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
                        <legend class="fieldSetLabel">Add New Barcode</legend>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label mb-10">
                                    Number<samp style="color: Red">*</samp></label>
                                <asp:HiddenField ID="hdfareaid" runat="server" ClientIDMode="static" Value="0" />
                                <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfShopid" runat="server" ClientIDMode="Static" Value="0" />
                                <input type="text" class="form-control" id="txtnumber" placeholder="Number" onfocus="allownumericwithoutdecimal(this);" maxlength="40" autocomplete="off" />

                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label mb-10">
                                    Type<samp style="color: Red">*</samp></label>
                                <select id="ddltype" class="form-control" clientidmode="Static">
                                    <option value="BAR">Barcode</option>
                                    <option value="QR">QRCode</option>
                                </select>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Image Detail</legend>

                        <div class="col-md-12">
                            <div class="panel-body" id="barcodeprint">
                                <div class="col-md-12 col-sm-12 col-xs-12" id="img" style="display: inline;">
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>





        <!--button section --->
        <div class="col-md-12 fixbuttonsectionbuttom">
            <div class="col-md-12 text-center">

                <input type="button" id="btnadd" class="btn btn-success btn-xs" value="Create Images" />
                <input type="button" id="btnprint" class="btn btn-warning btn-xs" value="Print Images" />
                <input type="button" id="btnclear" class="btn btn-info btn-xs" value="Clear" />
            </div>
        </div>
    </div>
    <!--Modal Popup for Chief Complaint-->


</asp:Content>
