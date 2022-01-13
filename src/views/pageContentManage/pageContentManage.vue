<template>
  <div class="pageContentManage_warp">
    <el-tabs class="tabs" v-model="activeName" @tab-click="handleTabClick">
      <!--   首页配置   -->
      <el-tab-pane class="tab-pane" :label="$t('manage.Home')" name="1">
        <div class="tab-pane-content" v-loading="homeLoading">

          <div class="card home-image">
            <div class="card-title">
              {{$t('manage.GroupInformation')}}
            </div>
            <div class="card-content">
              <el-form ref="homeImageForm" :rules="rules" :model="homeImageForm" label-width="160px">
                <el-form-item :label="$t('manage.GroupName_cn')" prop="groupName_cn">
                  <el-input v-model="homeImageForm.groupName_cn" :rows="3"></el-input>
                </el-form-item>
                <el-form-item :label="$t('manage.GroupName_en')" prop="groupName_en">
                  <el-input v-model="homeImageForm.groupName_en" :rows="3"></el-input>
                </el-form-item>
                <el-form-item :label="$t('manage.ContactAddress_cn')" prop="contactAddress_cn">
                  <el-input type="textarea" v-model="homeImageForm.contactAddress_cn" :rows="3"></el-input>
                </el-form-item>
                <el-form-item :label="$t('manage.ContactAddress_en')" prop="contactAddress_en">
                  <el-input type="textarea" v-model="homeImageForm.contactAddress_en" :rows="3"></el-input>
                </el-form-item>
              </el-form>

            </div>
          </div>

          <div class="card home-image">
            <div class="card-title">
              {{$t('manage.HomeMainImage')}}
            </div>
            <div class="card-content">
              <el-form ref="homeImageForm" :rules="rules" :model="homeImageForm" label-width="140px">
                <el-form-item :label="$t('manage.ImageDescription_cn')" prop="describe_cn">
                  <el-input type="textarea" v-model="homeImageForm.describe_cn" :rows="3"></el-input>
                </el-form-item>
                <el-form-item :label="$t('manage.ImageDescription_en')" prop="describe_en">
                  <el-input type="textarea" v-model="homeImageForm.describe_en" :rows="3"></el-input>
                </el-form-item>
                <el-form-item :label="$t('manage.UploadPicture')" prop="imageUrl">
                  <el-upload
                      :action="uploadAction"
                      :headers="uploadHeaders"
                      :file-list="homeImageFileList"
                      :multiple="false"
                      name="file"
                      :limit="1"
                      list-type="picture-card"
                      :on-exceed="handleImageUploadExceed"
                      :on-preview="handleImageUploadPreview"
                      :before-upload="beforeImageUpload"
                      :on-remove="handleImageUploadRemove"
                      :on-success="handleImageUploadSuccess"
                  >
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                    <div class="el-upload__tip" slot="tip">{{$t('manage.UploadPictureHint')}}</div>
                  </el-upload>
                </el-form-item>
              </el-form>

            </div>
          </div>

          <div class="card home-paper">
            <div class="card-title">
              {{$t('manage.HomeArticles')}}
            </div>
            <div class="card-title">
              {{$t('manage.Chinese')}}
            </div>
            <mavon-editor class="mavon-editor-warp" v-model="homePaperValue_cn"
                          :language="mavonEditorLang"
            ></mavon-editor>
            <br>
            <div class="card-title">
              {{$t('manage.English')}}
            </div>
            <mavon-editor class="mavon-editor-warp" v-model="homePaperValue_en"
                          :language="mavonEditorLang"
            ></mavon-editor>

            <div class="btn-warp">
              <el-button type="primary" :loading="btnLoading" @click="homeImageFormSubmit">{{$t('manage.Confirm')}}</el-button>
            </div>

          </div>

        </div>
      </el-tab-pane>

      <!--   研究页配置   -->
      <el-tab-pane class="tab-pane" :label="$t('manage.Research')" name="2">
        <div class="tab-pane-content" v-loading="researchListLoading">
          <el-button class="add-btn" type="primary" @click="addResearch">{{$t('manage.Add')}}</el-button>
          <el-table
              :data="researchTableData"
              style="width: 100%">
            <el-table-column
                prop="title_cn"
                :label="$t('manage.Title_cn')"
            >
            </el-table-column>
            <el-table-column
                prop="title_en"
                :label="$t('manage.Title_en')"
            >
            </el-table-column>
            <el-table-column
                prop="preface_cn"
                :label="$t('manage.Preface_cn')"
            >
            </el-table-column>
            <el-table-column
                prop="preface_en"
                :label="$t('manage.Preface_en')"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                :label="$t('manage.Image')"
                width="100">
              <template slot-scope="scope">
                <div class="table-column-img">
                  <el-image
                      style="max-width: 100px; max-height: 100px"
                      :src="scope.row.cover_image"
                      fit="contain"></el-image>
                </div>
              </template>
            </el-table-column>
            <el-table-column
                prop="name"
                :label="$t('manage.Action')"
                width="240">
              <template slot-scope="scope">
                <div class="table-column-action">
                  <el-button size="mini" type="primary" :loading="scope.row.isLoading" @click="editDetails(scope.row)">{{$t('manage.EditContent')}}</el-button>
                  <el-button size="mini" type="danger" :loading="scope.row.isLoading" @click="delResearch(scope.row)">{{$t('manage.Delete')}}</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="footer" v-if="researchTableData && researchTableData.length > 0">
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="currentResearchPage"
                @current-change="currentResearchPageChange"
                :total="pageResearchCount">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>

      <!--   新闻页配置   -->
      <el-tab-pane class="tab-pane" :label="$t('manage.News')" name="3">
        <div class="tab-pane-content" v-loading="newsListLoading">
          <el-button class="add-btn" type="primary" @click="addNew">{{$t('manage.Add')}}</el-button>
          <el-table
              :data="newsTableData"
              style="width: 100%">
            <el-table-column
                prop="title_cn"
                :label="$t('manage.Title_cn')"
            >
            </el-table-column>
            <el-table-column
                prop="title_en"
                :label="$t('manage.Title_en')"
            >
            </el-table-column>
            <el-table-column
                prop="preface_cn"
                :label="$t('manage.Preface_cn')"
            >
            </el-table-column>
            <el-table-column
                prop="preface_en"
                :label="$t('manage.Preface_en')"
            >
            </el-table-column>
            <el-table-column
                prop="news_date"
                :label="$t('manage.Date')"
            >
            </el-table-column>
            <el-table-column
                prop="cover_image"
                :label="$t('manage.Image')"
                width="100">
              <template slot-scope="scope">
                <div class="table-column-img">
                  <el-image
                      style="max-width: 100px; max-height: 100px"
                      :src="scope.row.cover_image"
                      fit="contain"></el-image>
                </div>
              </template>
            </el-table-column>
            <el-table-column
                prop="name"
                :label="$t('manage.Action')"
                width="240">
              <template slot-scope="scope">
                <div class="table-column-action">
                  <el-button size="mini" type="primary" :loading="scope.row.isLoading" @click="editDetails(scope.row)">{{$t('manage.EditContent')}}</el-button>
                  <el-button size="mini" type="danger" :loading="scope.row.isLoading" @click="delNew(scope.row)">{{$t('manage.Delete')}}</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="footer" v-if="newsTableData && newsTableData.length > 0">
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="currentNewsPage"
                @current-change="currentNewsPageChange"
                :total="pageNewsCount">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>

      <!--   出版物页配置   -->
      <el-tab-pane class="tab-pane" :label="$t('manage.Publications')" name="4">
        <div class="tab-pane-content" v-loading="publicationListLoading">
          <el-button class="add-btn" type="primary" @click="addPublication">{{$t('manage.Add')}}</el-button>
          <el-table
              :data="publicationTableData"
              style="width: 100%">
            <el-table-column
                prop="title_cn"
                :label="$t('manage.Title_cn')"
            >
            </el-table-column>
            <el-table-column
                prop="title_en"
                :label="$t('manage.Title_en')"
            >
            </el-table-column>
            <el-table-column
                prop="authors_cn"
                :label="$t('manage.Author_cn')"
            >
            </el-table-column>
            <el-table-column
                prop="authors_en"
                :label="$t('manage.Author_en')"
            >
            </el-table-column>
            <el-table-column
                prop="issn"
                :label="$t('manage.JournalTitle')"
            >
            </el-table-column>
            <el-table-column
                prop="publish_link"
                :label="$t('manage.JournalLink')"
            >
            </el-table-column>
            <el-table-column
                prop="publish_date"
                :label="$t('manage.PeriodicalPublicationDate')"
            >
            </el-table-column>

            <el-table-column
                prop="name"
                :label="$t('manage.Action')"
                width="120">
              <template slot-scope="scope">
                <div class="table-column-action">
                  <el-button size="mini" type="danger" :loading="scope.row.isLoading" @click="delPublication(scope.row)">{{$t('manage.Delete')}}</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="footer" v-if="publicationTableData && publicationTableData.length > 0">
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="currentPublicationPage"
                @current-change="currentPublicationPageChange"
                :total="pagePublicationCount">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>

      <!--   成员页配置   -->
      <el-tab-pane class="tab-pane" :label="$t('manage.People')" name="5">
        <div class="tab-pane-content" v-loading="peopleListLoading">
          <el-button class="add-btn" type="primary" @click="addPeople">{{$t('manage.Add')}}</el-button>
          <el-table
              :data="peopleTableData"
              style="width: 100%">
            <el-table-column
                prop="name_cn"
                :label="$t('manage.Name_cn')"
            >
            </el-table-column>
            <el-table-column
                prop="name_en"
                :label="$t('manage.Name_en')"
            >
            </el-table-column>
            <el-table-column
                prop="contact_cn"
                :label="$t('manage.ContactContact_cn')"
            >
            </el-table-column>
            <el-table-column
                prop="contact_en"
                :label="$t('manage.ContactContact_en')"
            >
            </el-table-column>
            <el-table-column
                prop="type"
                :label="$t('manage.Type')"
            >
              <template slot-scope="scope">
                {{getPeopleTypeOptionLabel(scope.row.type)['label_' + currLang]}}
              </template>
            </el-table-column>
            <el-table-column
                prop="introduction_cn"
                :label="$t('manage.Introduction_cn')"
            >
            </el-table-column>
            <el-table-column
                prop="introduction_en"
                :label="$t('manage.Introduction_en')"
            >
            </el-table-column>
            <el-table-column
                prop="photo"
                :label="$t('manage.Image')"
            >
              <template slot-scope="scope">
                <div class="table-column-img">
                  <el-image
                      style="max-width: 100px; max-height: 100px"
                      :src="scope.row.photo"
                      fit="contain"></el-image>
                </div>
              </template>
            </el-table-column>
            <el-table-column
                prop="name"
                :label="$t('manage.Action')"
                width="240">
              <template slot-scope="scope">
                <div class="table-column-action">
                  <el-button size="mini" type="primary" v-if="scope.row.type === 'teacher'" :loading="scope.row.isLoading" @click="editDetails(scope.row)">{{$t('manage.EditContent')}}</el-button>
                  <el-button size="mini" type="danger" :loading="scope.row.isLoading" @click="delPeople(scope.row)">{{$t('manage.Delete')}}</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
<!--          <div class="footer" v-if="peopleTableData && peopleTableData.length > 0">-->
<!--            <el-pagination-->
<!--                background-->
<!--                layout="prev, pager, next"-->
<!--                :current-page.sync="currentPeoplePage"-->
<!--                @current-change="currentPeoplePageChange"-->
<!--                :total="pageNewsCount">-->
<!--            </el-pagination>-->
<!--          </div>-->
        </div>
      </el-tab-pane>

      <!--   自定义页配置   -->
      <el-tab-pane class="tab-pane" v-for="(item, index) in newMenuList" :key="'tab-pane' + index" :label="item['title_' + currLang]" :name="item.key">
        <div class="tab-pane-content" v-loading="customPageLoading">
          <div class="content-cn">
            <div class="content-title">
              {{$t('manage.ChineseVersion')}}
            </div>
            <mavon-editor class="mavon-editor-warp" v-model="newMenuListPageData[index].value_cn"
                          :language="mavonEditorLang"
            ></mavon-editor>
          </div>
          <div class="content-en">
            <div class="content-title">
              {{$t('manage.EnglishVersion')}}
            </div>
            <mavon-editor class="mavon-editor-warp" v-model="newMenuListPageData[index].value_en"
                          :language="mavonEditorLang"
            ></mavon-editor>
          </div>

          <div class="submit-btn">
            <el-button type="primary" :loading="btnLoading" @click="customPageSubmit(item)">{{$t('manage.Confirm')}}</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!--  图片预览  -->
    <el-dialog :visible.sync="previewDialogVisible">
      <el-image
          style="width: 100%"
          :src="previewImageUrl"
          fit="contain"></el-image>
    </el-dialog>

    <!--  编辑详情弹窗  -->
    <el-dialog
        :title="$t('manage.EditDetails')"
        :visible.sync="editDetailsDialogVisible"
        width="80%"
        custom-class="edit_details_dialog_warp"
        :before-close="editDetailsDialogCancel">
      <div class="dialog-content">
        <div class="content-cn">
          <div class="content-title">
            {{$t('manage.ChineseVersion')}}
          </div>
          <mavon-editor class="mavon-editor-warp" v-model="pageDetails.data_cn"
                        :language="mavonEditorLang"
          ></mavon-editor>
        </div>
        <div class="content-cn">
          <div class="content-title">
            {{$t('manage.EnglishVersion')}}
          </div>
          <mavon-editor class="mavon-editor-warp" v-model="pageDetails.data_en"
                        :language="mavonEditorLang"
          ></mavon-editor>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDetailsDialogCancel">{{$t('manage.Cancel')}}</el-button>
        <el-button type="primary" :loading="btnLoading" @click="editDetailsDialogConfirm">{{$t('manage.Confirm')}}</el-button>
      </span>
    </el-dialog>

    <!--  新增研究方向  -->
    <el-dialog
        :title="$t('manage.Add')"
        :visible.sync="addResearchDialogVisible"
        width="800px"
        custom-class="add_research_dialog_warp"
        :before-close="addResearchDialogCancel">
      <div class="dialog-content">
        <el-form :model="addResearchForm" :rules="rules" ref="addResearchFormRef" label-width="140px">
          <el-form-item :label="$t('manage.Title_cn')" prop="title_cn">
            <el-input v-model="addResearchForm.title_cn" :placeholder="$t('manage.PleaseEnter')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('manage.Title_en')" prop="title_en">
            <el-input v-model="addResearchForm.title_en" :placeholder="$t('manage.PleaseEnter')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('manage.Preface_cn')" prop="preface_cn">
            <el-input type="textarea" v-model="addResearchForm.preface_cn" :placeholder="$t('manage.PleaseEnter')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('manage.Preface_en')" prop="preface_en">
            <el-input type="textarea" v-model="addResearchForm.preface_en" :placeholder="$t('manage.PleaseEnter')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('manage.Image')" prop="imageUrl">
            <el-upload
                ref="addResearchFormUploadRef"
                :action="uploadAction"
                :headers="uploadHeaders"
                :multiple="false"
                name="file"
                :limit="1"
                list-type="picture-card"
                :on-exceed="handleImageUploadExceed"
                :on-preview="handleImageUploadPreview"
                :before-upload="beforeImageUpload"
                :on-remove="handleAddResearchImageUploadRemove"
                :on-success="handleAddResearchImageUploadSuccess"
            >
              <i class="el-icon-plus avatar-uploader-icon"></i>
              <div class="el-upload__tip" slot="tip">{{$t('manage.UploadPictureHint')}}</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addResearchDialogCancel">{{$t('manage.Cancel')}}</el-button>
        <el-button type="primary" :loading="btnLoading" @click="addResearchDialogConfirm">{{$t('manage.Confirm')}}</el-button>
      </span>
    </el-dialog>

    <!--  新增新闻  -->
    <el-dialog
        :title="$t('manage.Add')"
        :visible.sync="addNewDialogVisible"
        width="800px"
        custom-class="add_new_dialog_warp"
        :before-close="addNewDialogCancel">
      <div class="dialog-content">
        <el-form :model="addNewForm" :rules="rules" ref="addNewFormRef" label-width="140px">
          <el-form-item :label="$t('manage.Title_cn')" prop="title_cn">
            <el-input v-model="addNewForm.title_cn" :placeholder="$t('manage.PleaseEnter')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('manage.Title_en')" prop="title_en">
            <el-input v-model="addNewForm.title_en" :placeholder="$t('manage.PleaseEnter')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('manage.Preface_cn')" prop="preface_cn">
            <el-input type="textarea" v-model="addNewForm.preface_cn" :placeholder="$t('manage.PleaseEnter')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('manage.Preface_en')" prop="preface_en">
            <el-input type="textarea" v-model="addNewForm.preface_en" :placeholder="$t('manage.PleaseEnter')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('manage.Date')" prop="date">
            <el-date-picker
                v-model="addNewForm.date"
                type="date"
                value-format="yyyy-MM-dd"
                :placeholder="$t('manage.SelectDate')">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('manage.Image')" prop="imageUrl">
            <el-upload
                ref="addNewFormUploadRef"
                :action="uploadAction"
                :headers="uploadHeaders"
                :multiple="false"
                name="file"
                :limit="1"
                list-type="picture-card"
                :on-exceed="handleImageUploadExceed"
                :on-preview="handleImageUploadPreview"
                :before-upload="beforeImageUpload"
                :on-remove="handleAddNewImageUploadRemove"
                :on-success="handleAddNewImageUploadSuccess"
            >
              <i class="el-icon-plus avatar-uploader-icon"></i>
              <div class="el-upload__tip" slot="tip">{{$t('manage.UploadPictureHint')}}</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addNewDialogCancel">{{$t('manage.Cancel')}}</el-button>
        <el-button type="primary" :loading="btnLoading" @click="addNewDialogConfirm">{{$t('manage.Confirm')}}</el-button>
      </span>
    </el-dialog>

    <!--  新增发布的成果  -->
    <el-dialog
        :title="$t('manage.Add')"
        :visible.sync="addPublicationDialogVisible"
        width="800px"
        custom-class="add_publication_dialog_warp"
        :before-close="addPublicationDialogCancel">
      <div class="dialog-content">
        <el-form :model="addPublicationForm" :rules="rules" ref="addPublicationFormRef" label-width="140px">
          <el-form-item :label="$t('manage.Title_cn')" prop="title_cn">
            <el-input v-model="addPublicationForm.title_cn" :placeholder="$t('manage.PleaseEnter')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('manage.Title_en')" prop="title_en">
            <el-input v-model="addPublicationForm.title_en" :placeholder="$t('manage.PleaseEnter')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('manage.Author_cn')" prop="authors_cn">
            <el-input type="textarea" v-model="addPublicationForm.authors_cn" :placeholder="$t('manage.PleaseEnter')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('manage.Author_en')" prop="authors_en">
            <el-input type="textarea" v-model="addPublicationForm.authors_en" :placeholder="$t('manage.PleaseEnter')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('manage.JournalTitle')" prop="issn">
            <el-input v-model="addPublicationForm.issn" :placeholder="$t('manage.PleaseEnter')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('manage.PeriodicalPublicationDate')" prop="publish_date">
            <el-date-picker
                v-model="addPublicationForm.publish_date"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :placeholder="$t('manage.SelectDate')">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('manage.JournalLink')" prop="publish_link">
            <el-input v-model="addPublicationForm.publish_link" :placeholder="$t('manage.PleaseEnter')">
              <template slot="prepend">https://</template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPublicationDialogCancel">{{$t('manage.Cancel')}}</el-button>
        <el-button type="primary" :loading="btnLoading" @click="addPublicationDialogConfirm">{{$t('manage.Confirm')}}</el-button>
      </span>
    </el-dialog>

    <!--  新增人员  -->
    <el-dialog
        :title="$t('manage.Add')"
        :visible.sync="addPeopleDialogVisible"
        width="800px"
        custom-class="add_people_dialog_warp"
        :before-close="addPeopleDialogCancel">
      <div class="dialog-content">
        <el-form :model="addPeopleForm" :rules="rules" ref="addPeopleFormRef" label-width="140px">
          <el-form-item :label="$t('manage.Name_cn')" prop="name_cn">
            <el-input v-model="addPeopleForm.name_cn" :placeholder="$t('manage.PleaseEnter')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('manage.Name_en')" prop="name_en">
            <el-input v-model="addPeopleForm.name_en" :placeholder="$t('manage.PleaseEnter')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('manage.ContactContact_cn')" prop="contact_cn">
            <el-input v-model="addPeopleForm.contact_cn" :placeholder="$t('manage.PleaseEnter')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('manage.ContactContact_en')" prop="contact_en">
            <el-input v-model="addPeopleForm.contact_en" :placeholder="$t('manage.PleaseEnter')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('manage.Type')" prop="type">
            <el-select v-model="addPeopleForm.type" :placeholder="$t('manage.PleaseChoose')">
              <el-option
                  v-for="(item, index) in peopleTypeOption"
                  :key="'peopleType' + index"
                  :label="item['label_' + currLang]"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="addPeopleForm.type === 'teacher'" :label="$t('manage.Introduction_cn')" prop="introduction_cn">
            <el-input type="textarea" v-model="addPeopleForm.introduction_cn" :placeholder="$t('manage.PleaseEnter')"></el-input>
          </el-form-item>
          <el-form-item v-if="addPeopleForm.type === 'teacher'" :label="$t('manage.Introduction_en')" prop="introduction_en">
            <el-input type="textarea" v-model="addPeopleForm.introduction_en" :placeholder="$t('manage.PleaseEnter')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('manage.Image')" prop="imageUrl">
            <el-upload
                ref="addPeopleFormUploadRef"
                :action="uploadAction"
                :headers="uploadHeaders"
                :multiple="false"
                name="file"
                :limit="1"
                list-type="picture-card"
                :on-exceed="handleImageUploadExceed"
                :on-preview="handleImageUploadPreview"
                :before-upload="beforeImageUpload"
                :on-remove="handleAddPeopleImageUploadRemove"
                :on-success="handleAddPeopleImageUploadSuccess"
            >
              <i class="el-icon-plus avatar-uploader-icon"></i>
              <div class="el-upload__tip" slot="tip">{{$t('manage.UploadPictureHint')}}</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPeopleDialogCancel">{{$t('manage.Cancel')}}</el-button>
        <el-button type="primary" :loading="btnLoading" @click="addPeopleDialogConfirm">{{$t('manage.Confirm')}}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import ModifyPaperContent from "@/components/modifyPaperContent/modifyPaperContent";
import {upload_file_URL, file_before_url} from '@/config/baseURL'
import {
  GetTabManagementTabListApi,
  GetTabEditTabApi,
  PostTabEditTabApi,
  GetNewsManagementNewsListApi,
  PostNewsAddNewsApi,
  PostNewsEditNewsApi,
  PostNewsDeleteNewsApi,
  GetResearchManagementResearchListApi,
  GetResearchAddResearchApi,
  PostResearchDeleteResearchApi,
  GetResearchEditResearchApi,
  GetPublicationManagementPublicationListApi,
  PostPublicationAddPublicationApi,
  PostPublicationDeletePublicationApi,
  GetMemberManagementMemberListApi,
  PostMemberAddMemberApi, PostMemberDeleteMemberApi, PostMemberEditMemberApi, GetIndexIndexInfoApi, GetIndexEditIndexApi
} from "@/request/api";
import {mapMutations} from "vuex";
export default {
  name: "pageContentManage",
  components: {ModifyPaperContent},
  data() {
    return {
      newMenuList: [],
      newMenuListPageData: [],
      fileBeforeUrl: file_before_url,
      uploadAction: upload_file_URL,
      rules: {
        describe: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        describe_cn: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        describe_en: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        imageUrl: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        title_cn: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        title_en: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        date: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        author: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        journalTitle: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        journalUrl: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        preface_cn: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        preface_en: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        authors_cn: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        authors_en: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        issn: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        publish_link: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        publish_date: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        type: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        name_cn: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        name_en: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        contact_cn: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        contact_en: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        groupName_cn: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        groupName_en: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        contactAddress_cn: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        contactAddress_en: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        introduction_cn: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        introduction_en: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
      },
      uploadHeaders: {
        Authorization: '',
      },
      activeName: '1',

      customPageLoading: false,
      btnLoading: false,
      pageSize: 10,

      previewDialogVisible: false,
      previewImageUrl: '',

      /**
      * 首页
      * */
      homeLoading: false,
      homeImageForm: {
        describe_cn: '',
        describe_en: '',
        imageUrl: '',
        groupName_cn: '',
        groupName_en: '',
        contactAddress_cn: '',
        contactAddress_en: '',
      },
      homeImageFileList: [],
      homePaperValue_cn: '',
      homePaperValue_en: '',

      /**
      * 编辑详情
      * */
      currEditId: '',
      editDetailsDialogVisible: false,
      pageDetails: {
        data_cn: '',
        data_en: '',
      },

      /**
      * 新增研究方向
      * */
      researchListLoading: false,
      currentResearchPage: 1,
      pageResearchCount: 0,
      researchTableData: [],
      addResearchDialogVisible: false,
      addResearchForm: {
        title_cn: '',
        title_en: '',
        preface_cn: '',
        preface_en: '',
        imageUrl: '',
      },

      /**
       * 新增新闻
       * */
      newsListLoading: false,
      currentNewsPage: 1,
      pageNewsCount: 0,
      newsTableData: [],
      addNewDialogVisible: false,
      addNewForm: {
        title_cn: '',
        title_en: '',
        preface_cn: '',
        preface_en: '',
        date: '',
        imageUrl: '',
      },

      /**
       * 新增发布过的成果
       * */
      publicationListLoading: false,
      currentPublicationPage: 1,
      pagePublicationCount: 0,
      publicationTableData: [],
      addPublicationDialogVisible: false,
      addPublicationForm: {
        title_cn: '',
        title_en: '',
        authors_cn: '',
        authors_en: '',
        publish_link: '',
        publish_date: '',
        issn: '',
      },

      /**
       * 新增人员
       * */
      peopleTypeOption: [],
      peopleListLoading: false,
      currentPeoplePage: 1,
      pagePeopleCount: 0,
      peopleTableData: [],
      addPeopleDialogVisible: false,
      addPeopleForm: {
        type: '',
        imageUrl: '',
        name_cn: '',
        name_en: '',
        contact_cn: '',
        contact_en: '',
        introduction_cn: '',
        introduction_en: '',
      },

    }
  },
  computed: {
    currLang() {
      return this.$store.state.currLang
    },
    mavonEditorLang() {
      let str = 'zh-CN'
      if (this.currLang === 'en') {
        str = 'en'
      }
      return str
    },
    menuList() {
      return this.$store.state.menuList
    },
    token() {
      return this.$store.state.token;
    }
  },
  watch: {
    token: {
      handler: function () {
        this.uploadHeaders.Authorization = this.token
      },
      immediate: true
    }
  },
  mounted() {
    this.initData()
    if (parseInt(this.activeName) > 5) {
      this.loadCustomPageData()
    }else {
      if (this.activeName === '1') {
        this.loadHomeData()
      }
      if (this.activeName === '2') {
        this.loadResearchData()
      }
      if (this.activeName === '3') {
        this.loadNewsData()
      }
      if (this.activeName === '4') {
        this.loadPublicationData()
      }
      if (this.activeName === '5') {
        this.loadPeopleData()
      }
    }
  },
  methods: {
    ...mapMutations(['setMenuList', 'setGroupInfo']),
    /**
     * 获取数据
     * */
    async initData() {
      this.menuList.forEach((item, index) => {
        if (item.key && parseInt(item.key) > 5) {
          this.newMenuList.push(item)
          let obj = {
            ...item,
            value_cn: '',
            value_en: '',
          }
          this.newMenuListPageData.push(obj)
        }

        if (item.key === '5') {
          if (item.children && item.children.length > 0) {
            item.children.forEach((item2, index2) => {
              let obj2 = {
                ...item2,
                label_cn: item2.title_cn,
                label_en: item2.title_en,
                value: this.getUrlParam(item2.router, 'search'),
              }
              this.peopleTypeOption.push(obj2)
            })
          }
        }
      })
    },
    /**
     * 获取url链接中的指定参数
     * */
    getUrlParam(url, name){
      let param = ''

      if (url.indexOf('?') !== -1) {
        let allParamsStr = url.split('?')[1]
        let allParams = allParamsStr.split('&')
        allParams.forEach((item, index) => {
          let paramArr = item.split('=')
          if (paramArr[0] === name) {
            param = paramArr[1]
          }
        })
      }

      return param
    },
    /**
     * 获取人员可选项列表中对应的label值
     * */
    getPeopleTypeOptionLabel(value) {
      let obj = {
        label_cn: '',
        label_en: '',
      }
      this.peopleTypeOption.forEach((item, index) => {
        if (item.value === value) {
          obj.label_cn = item.label_cn
          obj.label_en = item.label_en
        }
      })
      return obj
    },
    /**
    * 获取自定义页的数据
    * */
    async loadCustomPageData() {
      this.customPageLoading = true
      if (parseInt(this.activeName) > 5) {
        let id = ''
        this.newMenuList.forEach((item, index) => {
          if ((item.key === this.activeName)) {
            id = item.id
          }
        })
        const res = await GetTabEditTabApi({
          tab_id: id
        })
        console.log('GetTabEditTabApi', res)
        if (res) {
          this.newMenuListPageData.forEach((item, index) => {
            if (item.key === res.tab_info.key) {
              item.value_cn = res.tab_info.tab_content.content_cn
              item.value_en = res.tab_info.tab_content.content_en
            }
          })
        }
      }
      this.customPageLoading = false
    },
    /**
    * 切换tab页时触发
    * */
    handleTabClick(tab) {
      if (parseInt(this.activeName) > 5) {
        this.loadCustomPageData()
      }else {
        if (this.activeName === '1') {
          this.loadHomeData()
        }
        if (this.activeName === '2') {
          this.loadResearchData()
        }
        if (this.activeName === '3') {
          this.loadNewsData()
        }
        if (this.activeName === '4') {
          this.loadPublicationData()
        }
        if (this.activeName === '5') {
          this.loadPeopleData()
        }
      }
    },

    /**
    * 获取首页数据
    * */
    async loadHomeData() {
      this.homeLoading = true
      const res = await GetIndexIndexInfoApi()
      console.log(res)
      if (res) {
        this.homeImageForm.groupName_cn = res.index_info.group_name_cn
        this.homeImageForm.groupName_en = res.index_info.group_name_en
        this.homeImageForm.contactAddress_cn = res.index_info.contact_address_cn
        this.homeImageForm.contactAddress_en = res.index_info.contact_address_en
        this.homePaperValue_cn = res.index_info.home_article_cn
        this.homePaperValue_en = res.index_info.home_article_en
        this.homeImageForm.imageUrl = res.index_info.home_image
        this.homeImageForm.describe_cn = res.index_info.home_image_description_cn
        this.homeImageForm.describe_en = res.index_info.home_image_description_en

        this.setGroupInfo({
          groupInfo: {
            name_cn: this.homeImageForm.groupName_cn,
            name_en: this.homeImageForm.groupName_en,
            contactAddress_cn: this.homeImageForm.contactAddress_cn,
            contactAddress_en: this.homeImageForm.contactAddress_en,
          }
        })

        if (this.homeImageForm.imageUrl !== '') {
          let arr = []
          arr.push({
            name: 'image',
            url: this.fileBeforeUrl + this.homeImageForm.imageUrl
          })
          this.homeImageFileList = arr
        }
      }
      this.homeLoading = false
    },

    /**
    * 上传首页图片时，在上传前触发
    * */
    beforeImageUpload(file) {
      const fileType = file.type
      const isLt2M = file.size / 1024 / 1024 <= 2;

      let isJPGOrPng = true
      if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
        this.$message.error('上传图片只能是 JPG/JPEG 或 PNG 格式!')
        isJPGOrPng = false
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }

      if (isJPGOrPng && isLt2M) {

      }

      return isJPGOrPng && isLt2M
    },
    /**
     * 上传首页图片时，超出了数量上限触发
     * */
    handleImageUploadExceed(files, fileList) {
      this.$message.warning('超出了数量上限！')
    },
    /**
     * 上传首页图片时，图片预览
     * */
    handleImageUploadPreview(file) {
      console.log(file.url)
      this.previewImageUrl = file.url
      this.previewDialogVisible = true
    },
    /**
     * 上传首页图片时，图片删除
     * */
    handleImageUploadRemove(file, fileList) {
      this.homeImageForm.imageUrl = ''
    },
    /**
     * 上传首页图片时，图片上传成功
     * */
    handleImageUploadSuccess(res, file) {
      console.log('handleImageUploadSuccess', res)
      if (res.code === 200) {
        this.homeImageForm.imageUrl = res.data.path
      }
    },
    /**
    * 首页图片表单提交时触发
    * */
    homeImageFormSubmit() {
      this.$refs.homeImageForm.validate(async (valid) => {
        if (valid) {
          this.btnLoading = true
          let param = {
            home_image: this.homeImageForm.imageUrl,
            home_image_description_cn: this.homeImageForm.describe_cn,
            home_image_description_en: this.homeImageForm.describe_en,
            home_article_cn: this.homePaperValue_cn,
            home_article_en: this.homePaperValue_en,
            group_name_cn: this.homeImageForm.groupName_cn,
            group_name_en: this.homeImageForm.groupName_en,
            contact_address_cn: this.homeImageForm.contactAddress_cn,
            contact_address_en: this.homeImageForm.contactAddress_en,
          }
          const res = await GetIndexEditIndexApi({
            index_info: JSON.stringify(param)
          })
          console.log(res)
          if (res) {
            this.$message.success('操作成功')
          }
          this.btnLoading = false
          this.loadHomeData()
        }
      })
    },
    /**
     * 去编辑详情
     * */
    editDetails(data) {
      console.log(data)
      this.currEditId = data.id
      if (this.activeName === '5') {
        this.pageDetails.data_cn = data.detail_cn
        this.pageDetails.data_en = data.detail_en
      }else {
        this.pageDetails.data_cn = data.content_cn
        this.pageDetails.data_en = data.content_en
      }

      this.editDetailsDialogVisible = true
    },
    /**
     * 编辑详情弹窗提交时触发
     * */
    async editDetailsDialogConfirm() {

      if (!this.pageDetails.data_cn || !this.pageDetails.data_en) {
        this.$message.warning('详情内容不能为空')
        return
      }
      if (this.btnLoading) {
        return;
      }
      this.btnLoading = true

      let res = null

      if (this.activeName === '2') {
        res = await GetResearchEditResearchApi({
          research_id: this.currEditId,
          content_cn: this.pageDetails.data_cn,
          content_en: this.pageDetails.data_en,
        })
      }
      if (this.activeName === '3') {
        res = await PostNewsEditNewsApi({
          news_id: this.currEditId,
          content_cn: this.pageDetails.data_cn,
          content_en: this.pageDetails.data_en,
        })
      }
      if (this.activeName === '5') {
        res = await PostMemberEditMemberApi({
          member_id: this.currEditId,
          detail_cn: this.pageDetails.data_cn,
          detail_en: this.pageDetails.data_en,
        })
      }

      console.log(res)
      if (res) {
        this.$message.success('修改成功')
      }

      this.btnLoading = false
      if (this.activeName === '2') {
        this.loadResearchData()
      }
      if (this.activeName === '3') {
        this.loadNewsData()
      }
      if (this.activeName === '5') {
        this.loadPeopleData()
      }

      this.editDetailsDialogCancel()
    },
    /**
     * 编辑详情弹窗关闭时触发
     * */
    editDetailsDialogCancel() {
      this.editDetailsDialogVisible = false
    },
    /**
     * 获取研究方向
     * */
    async loadResearchData() {
      this.researchListLoading = true
      const res = await GetResearchManagementResearchListApi({
        page_num: this.currentResearchPage,
        page_size: this.pageSize,
      })
      console.log(res)
      if (res) {
        this.researchTableData = res.research_info_list
        this.pageResearchCount = res.num_of_pages
      }
      this.researchListLoading = false
    },
    /**
     * 研究方向表格页码切换时触发
     * */
    currentResearchPageChange() {
      this.loadResearchData()
    },
    /**
    * 新增研究方向
    * */
    addResearch() {
      this.addResearchDialogVisible = true
    },
    /**
     * 新增研究方向弹窗提交时触发
     * */
    addResearchDialogConfirm() {
      this.$refs.addResearchFormRef.validate(async (valid) => {
        if (valid) {
          this.btnLoading = true
          const res = await GetResearchAddResearchApi({
            title_cn: this.addResearchForm.title_cn,
            title_en: this.addResearchForm.title_en,
            cover_image: this.addResearchForm.imageUrl,
            preface_cn: this.addResearchForm.preface_cn,
            preface_en: this.addResearchForm.preface_en,
            content_cn: '',
            content_en: '',
          })
          console.log(res)
          if (res) {
            this.$message.success('新增成功')
          }
          this.addResearchDialogCancel()
          this.btnLoading = false
          this.loadResearchData()
        }
      })
    },
    /**
     * 新增研究方向弹窗关闭时触发
     * */
    addResearchDialogCancel() {
      this.$refs.addResearchFormUploadRef.clearFiles()
      this.$refs.addResearchFormRef.resetFields()
      this.addResearchDialogVisible = false
    },
    /**
     * 新增研究方向弹窗中，图片删除时触发
     * */
    handleAddResearchImageUploadRemove(file, fileList) {
      this.addResearchForm.imageUrl = ''
    },
    /**
     * 新增研究方向弹窗中，图片上传成功时触发
     * */
    handleAddResearchImageUploadSuccess(res, file) {
      console.log(res, file)
      if (res.code === 200) {
        this.addResearchForm.imageUrl = res.data.path
      }
    },
    /**
     * 删除研究方向
     * */
    async delResearch(data) {
      console.log(data)
      this.researchTableData.forEach((item, index) => {
        if (item.id === data.id) {
          this.$set(item, 'isLoading', true)
        }
      })
      const res = await PostResearchDeleteResearchApi({
        research_id: data.id
      })
      console.log(res)
      if (res) {
        this.$message.success('删除成功')
      }
      this.loadResearchData()
    },

    /**
    * 获取新闻列表
    * */
    async loadNewsData() {
      this.newsListLoading = true
      const res = await GetNewsManagementNewsListApi({
        page_num: this.currentNewsPage,
        page_size: this.pageSize,
      })
      console.log(res)
      if (res) {
        this.newsTableData = res.news_info_list
        this.pageNewsCount = res.num_of_pages
      }
      this.newsListLoading = false
    },
    /**
     * 新闻页面页码切换时触发
     * */
    currentNewsPageChange() {
      this.loadNewsData()
    },
    /**
     * 新增新闻
     * */
    addNew() {
      this.addNewDialogVisible = true
    },
    /**
     * 新增新闻弹窗提交时触发
     * */
    addNewDialogConfirm() {
      this.$refs.addNewFormRef.validate(async (valid) => {
        if (valid) {
          this.btnLoading = true
          const res = await PostNewsAddNewsApi({
            title_cn: this.addNewForm.title_cn,
            title_en: this.addNewForm.title_en,
            cover_image: this.addNewForm.imageUrl,
            preface_cn: this.addNewForm.preface_cn,
            preface_en: this.addNewForm.preface_en,
            news_date: this.addNewForm.date,
            content_cn: '',
            content_en: '',
          })
          console.log(res)
          if (res) {
            this.$message.success('新增成功')
          }
          this.addNewDialogCancel()
          this.btnLoading = false
          this.loadNewsData()
        }
      })
    },
    /**
     * 新增新闻弹窗关闭时触发
     * */
    addNewDialogCancel() {
      this.$refs.addNewFormUploadRef.clearFiles()
      this.$refs.addNewFormRef.resetFields()
      this.addNewDialogVisible = false
    },
    /**
     * 新增新闻弹窗中，图片删除时触发
     * */
    handleAddNewImageUploadRemove(file, fileList) {
      this.addNewForm.imageUrl = ''
    },
    /**
     * 新增新闻弹窗中，图片上传成功时触发
     * */
    handleAddNewImageUploadSuccess(res, file) {
      console.log(res, file)
      if (res.code === 200) {
        this.addNewForm.imageUrl = res.data.path
      }
    },
    /**
     * 删除新闻
     * */
    async delNew(data) {
      console.log(data)
      this.newsTableData.forEach((item, index) => {
        if (item.id === data.id) {
          this.$set(item, 'isLoading', true)
        }
      })
      const res = await PostNewsDeleteNewsApi({
        news_id: data.id
      })
      console.log(res)
      if (res) {
        this.$message.success('删除成功')
      }
      this.loadNewsData()
    },

    /**
     * 获取发布的成果列表
     * */
    async loadPublicationData() {
      this.publicationListLoading = true
      const res = await GetPublicationManagementPublicationListApi({
        page_num: this.currentPublicationPage,
        page_size: this.pageSize,
      })
      console.log(res)
      if (res) {
        this.publicationTableData = res.publication_info_list
        this.pagePublicationCount = res.num_of_pages
      }
      this.publicationListLoading = false
    },
    /**
     * 发布的成果表格页码切换时触发
     * */
    currentPublicationPageChange() {
      this.loadPublicationData()
    },
    /**
     * 新增发布的成果
     * */
    addPublication() {
      this.addPublicationDialogVisible = true
    },
    /**
     * 新增发布的成果弹窗提交时触发
     * */
    addPublicationDialogConfirm() {
      this.$refs.addPublicationFormRef.validate(async (valid) => {
        if (valid) {
          this.btnLoading = true
          const res = await PostPublicationAddPublicationApi({
            title_cn: this.addPublicationForm.title_cn,
            title_en: this.addPublicationForm.title_en,
            authors_cn: this.addPublicationForm.authors_cn,
            authors_en: this.addPublicationForm.authors_en,
            publish_link: this.addPublicationForm.publish_link,
            publish_date: this.addPublicationForm.publish_date,
            issn: this.addPublicationForm.issn,
          })
          console.log(res)
          if (res) {
            this.$message.success('新增成功')
          }
          this.addPublicationDialogCancel()
          this.btnLoading = false
          this.loadPublicationData()
        }
      })
    },
    /**
     * 新增发布的成果弹窗关闭时触发
     * */
    addPublicationDialogCancel() {
      this.$refs.addPublicationFormRef.resetFields()
      this.addPublicationDialogVisible = false
    },
    /**
     * 删除发布的成果
     * */
    async delPublication(data) {
      console.log(data)
      this.publicationTableData.forEach((item, index) => {
        if (item.id === data.id) {
          this.$set(item, 'isLoading', true)
        }
      })
      const res = await PostPublicationDeletePublicationApi({
        publication_id: data.id
      })
      console.log(res)
      if (res) {
        this.$message.success('删除成功')
      }
      this.loadPublicationData()
    },

    /**
     * 获取人员列表
     * */
    async loadPeopleData() {
      this.peopleListLoading = true
      const res = await GetMemberManagementMemberListApi({
        // page_num: this.currentPeoplePage,
        // page_size: this.pageSize,
      })
      console.log(res)
      if (res) {
        this.peopleTableData = res.member_info_list
        // this.pagePeopleCount = res.num_of_pages
      }
      this.peopleListLoading = false
    },
    /**
     * 人员页面页码切换时触发
     * */
    currentPeoplePageChange() {
      this.loadPeopleData()
    },
    /**
     * 新增人员
     * */
    addPeople() {
      this.addPeopleDialogVisible = true
    },
    /**
     * 新增人员弹窗提交时触发
     * */
    addPeopleDialogConfirm() {
      this.$refs.addPeopleFormRef.validate(async (valid) => {
        if (valid) {
          this.btnLoading = true
          const res = await PostMemberAddMemberApi({
            type: this.addPeopleForm.type,
            photo: this.addPeopleForm.imageUrl,
            name_cn: this.addPeopleForm.name_cn,
            name_en: this.addPeopleForm.name_en,
            contact_cn: this.addPeopleForm.contact_cn,
            contact_en: this.addPeopleForm.contact_en,
            introduction_cn: this.addPeopleForm.introduction_cn,
            introduction_en: this.addPeopleForm.introduction_en,
            detail_cn: '',
            detail_en: '',
          })
          console.log(res)
          if (res) {
            this.$message.success('新增成功')
          }
          this.addPeopleDialogCancel()
          this.btnLoading = false
          this.loadPeopleData()
        }
      })
    },
    /**
     * 新增人员弹窗关闭时触发
     * */
    addPeopleDialogCancel() {
      this.$refs.addPeopleFormUploadRef.clearFiles()
      this.$refs.addPeopleFormRef.resetFields()
      this.addPeopleDialogVisible = false
    },
    /**
     * 新增人员弹窗中，图片删除时触发
     * */
    handleAddPeopleImageUploadRemove(file, fileList) {
      this.addPeopleForm.imageUrl = ''
    },
    /**
     * 新增人员弹窗中，图片上传成功时触发
     * */
    handleAddPeopleImageUploadSuccess(res, file) {
      console.log(res, file)
      if (res.code === 200) {
        this.addPeopleForm.imageUrl = res.data.path
      }
    },
    /**
     * 删除人员
     * */
    async delPeople(data) {
      console.log(data)
      this.peopleTableData.forEach((item, index) => {
        if (item.id === data.id) {
          this.$set(item, 'isLoading', true)
        }
      })
      const res = await PostMemberDeleteMemberApi({
        member_id: data.id
      })
      console.log(res)
      if (res) {
        this.$message.success('删除成功')
      }
      this.loadPeopleData()
    },

    /**
    * 自定义页内容编辑的提交
    * */
    async customPageSubmit(obj) {
      this.btnLoading = true
      console.log(obj)
      let param = {
        content_cn: '',
        content_en: '',
      }
      this.newMenuListPageData.forEach((item, index) => {
        if (item.key === obj.key) {
          param.content_cn = item.value_cn
          param.content_en = item.value_en
        }
      })
      const res = await PostTabEditTabApi({
        tab_id: obj.id,
        key: obj.key,
        tab_content_cn: param.content_cn,
        tab_content_en: param.content_en,
      })
      console.log(res)
      if (res) {
        this.$message.success('操作成功')
        this.loadCustomPageData()
      }
      this.btnLoading = false
    },

  }
}
</script>

<style lang="scss" scoped>
.pageContentManage_warp {
  width: 100%;

  .mavon-editor-warp {
    max-height: 600px;
  }

  .tabs {
    width: 100%;

    .tab-pane {
      width: 100%;

      .tab-pane-content {
        width: 100%;

        .add-btn {
          margin-bottom: 10px;
        }

        .table-column-action {

        }

        .card {
          width: 100%;
          &:first-child {
            margin-bottom: 40px;
          }

          .card-title {
            font-size: 20px;
            margin-bottom: 20px;
          }
          .card-content {
            width: 100%;
          }
        }
        .home-paper {
          .btn-warp {
            margin-top: 20px;
          }
        }

        .footer {
          margin-top: 20px;
        }

      }

    }

    .content-cn,.content-en {
      margin-bottom: 40px;
      .content-title {
        font-size: 20px;
        margin-bottom: 10px;
      }
    }
    .content-en {

    }

    .submit-btn {
      width: 100%;
    }

  }
}
</style>

<style lang="scss">
.edit_details_dialog_warp {
  width: 100%;
  .content-cn,.content-en {
    margin-bottom: 40px;
    .content-title {
      font-size: 20px;
      margin-bottom: 10px;
    }
  }
  .content-en {

  }
}
</style>