<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="ChatDetail.aspx.cs" Inherits="ITHospital.Navigation.Chat.ChatDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/chatdetail.js") %>"></script>
  
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <h5 class="txt-dark">Online Chat Information </h5>
                </div>
                <!-- Breadcrumb -->
            </div>
        </div>

        <div class="panel panel-default card-view panel-refresh" style="margin-top: 2%;">
           
            <div class="refresh-container" style="display: none;">
                <div class="la-anim-1">
                    <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />

                </div>
            </div>

            <div id="collapse_1" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <!-- Main Content -->
                    <div class="container-fluid">

                        <!-- Row -->
                        <div class="row">
                            <div class="col-md-12">
                                <div class="panel panel-default border-panel card-view pa-0">
                                    <div class="panel-wrapper collapse in">
                                        <div class="panel-body pa-0">
                                            <div class="chat-cmplt-wrap chat-for-widgets-1" style="overflow:scroll">
                                                <div class="chat-box-wrap">
                                                    <div class="" style="position: relative; overflow: scroll; width: auto; height: 595px;">
                                                        <div class="chatapp-nicescroll-bar">
                                                            <ul class="chat-list-wrap">
                                                                <li class="chat-list">
                                                                    <div class="chat-body" id="onlinechatuser">
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="recent-chat-box-wrap">
                                                    <div class="recent-chat-wrap">
                                                        <div class="panel-heading ma-10 pt-15">
                                                            <div class="goto-back">
                                                                <a id="goto_back_widget_1" href="javascript:void(0)" class="inline-block txt-grey">Your Are Chat With : &nbsp;  <i class="zmdi zmdi-account" id="onlineusername"></i>
                                                                </a>
                                                                <a href="javascript:void(0)" class="inline-block text-right txt-grey"><i class="lnkdate"></i></a>
                                                                <div class="clearfix"></div>
                                                            </div>
                                                        </div>
                                                        <div class="panel-wrapper collapse in">
                                                            <div class="panel-body pa-0">
                                                                <div class="chat-content">
                                                                    <div class="slimScrollDiv" style="position: relative; overflow: scroll; width: auto; height: 483px;">
                                                                        <ul class="chatapp-chat-nicescroll-bar pt-20" id="chatpanel">
                                                                        </ul>
                                                                        <%--    <div class="slimScrollBar" style="background: rgb(135, 135, 135); width: 4px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 0px; z-index: 99; right: 1px; height: 483px;"></div>
                                                                        <div class="slimScrollRail" style="width: 4px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;"></div>
                                                                        --%>
                                                                    </div>
                                                                </div>

                                                                <div class="input-group">
                                                                    <input type="text" accesskey="T" id="input_msg_send_chatapp" name="send-msg" class="input-msg-send form-control" placeholder="Type something">

                                                                    <div class="input-group-btn attachment">
                                                                        <div class="fileupload btn btn-default" id="btnsendmessage">
                                                                            <i class="fa fa-send"></i>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /Row -->

                    </div>
                    <!-- /Main Content -->
                </div>
            </div>
        </div>
    </div>

</asp:Content>
