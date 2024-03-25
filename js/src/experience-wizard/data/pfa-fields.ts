import { Type } from "./fields/type";
import { Headline } from "./fields/headline";
import { Layout, LayoutWithOptions } from "./fields/layout";
import { Variant, VariantWithOptions } from "./fields/variant";
import { Theme } from "./fields/theme";
import {
  BackgroundColor,
  TextColor,
  HeadlineColor,
  CloseColor,
  ActionBackgroundColor,
  ActionTextColor,
  CancelBackgroundColor,
  CancelTextColor,
  FieldBackgroundColor,
} from "./fields/colors";
import { Message } from "./fields/msg";
import { OKShow } from "./fields/okShow";
import { OKMessage } from "./fields/okMessage";
import { CancelShow } from "./fields/cancelShow";
import { CancelMessage } from "./fields/cancelMessage";
import { Image } from "./fields/image";
import { PositionSelector } from "./fields/positionSelector";
import { Position, PositionWithOptions } from "./fields/position";
import { Origin, OriginWithOptions } from "./fields/origin";
import { PushDown } from "./fields/pushDown";
import { ExperienceTitle } from "./fields/experienceTitle";
import { ExperienceDescription } from "./fields/experienceDescription";
import { ExperienceSlug } from "./fields/experienceSlug";
import { ExperienceStatus } from "./fields/experienceStatus";
import { DisplayConditions } from "./fields/displayConditions";
import { HideAfter } from "./fields/displayConditions/hideAfter";
import { PageVisits } from "./fields/displayConditions/pageVisits";
import { ScrollPercentageToDisplay } from "./fields/displayConditions/scrollPercentageToDisplay";
import { ShowDelay } from "./fields/displayConditions/showDelay";
import { ShowOnExitIntent } from "./fields/displayConditions/showOnExitIntent";
import {
  ImpressionsGlobalDuration,
  ImpressionsGlobalSession,
  ImpressionsGlobalTotal,
  ImpressionsWidgetDuration,
  ImpressionsWidgetSession,
  ImpressionsWidgetTotal,
} from "./fields/displayConditions/impressions";
import {
  HideAfterActionClosedHideCount,
  HideAfterActionClosedHideDuration,
  HideAfterActionConfirmHideCount,
  HideAfterActionConfirmHideDuration,
  HideAfterActionCancelHideCount,
  HideAfterActionCancelHideDuration,
} from "./fields/displayConditions/hideAfterAction";
import { URLContains } from "./fields/displayConditions/urlContains";

export interface Field {
  id: string;
  label: string;
  description?: string;
  type: string;
  method: string;
  options?: SelectOption[];
  required?: boolean;
  hidden: boolean;
  support?: string[];
  render: string;
  dependencies?: {
    value: string | boolean;
    fieldsToShow: string[];
  }[];
}

export interface SelectOption {
  label: string;
  value: string;
  type?: string;
}

export const type = Type;
export const headline = Headline;
export const layout = Layout;
export const layoutWithOptions = LayoutWithOptions;
export const variant = Variant;
export const variantWithOptions = VariantWithOptions;
export const theme = Theme;
export const backgroundColor = BackgroundColor;
export const textColor = TextColor;
export const headlineColor = HeadlineColor;
export const closeColor = CloseColor;
export const actionBackgroundColor = ActionBackgroundColor;
export const actionTextColor = ActionTextColor;
export const cancelBackgroundColor = CancelBackgroundColor;
export const cancelTextColor = CancelTextColor;
export const fieldBackgroundColor = FieldBackgroundColor;
export const message = Message;
export const okShow = OKShow;
export const okMessage = OKMessage;
export const cancelShow = CancelShow;
export const cancelMessage = CancelMessage;
export const image = Image;
export const position = Position;
export const positionWithOptions = PositionWithOptions;
export const origin = Origin;
export const originWithOptions = OriginWithOptions;
export const positionSelector = PositionSelector;
export const pushDown = PushDown;
export const experienceTitle = ExperienceTitle;
export const experienceDescription = ExperienceDescription;
export const experienceSlug = ExperienceSlug;
export const experienceStatus = ExperienceStatus;
export const displayConditions = DisplayConditions;
export const hideAfter = HideAfter;
export const pageVisits = PageVisits;
export const scrollPercentageToDisplay = ScrollPercentageToDisplay;
export const showDelay = ShowDelay;
export const showOnExitIntent = ShowOnExitIntent;
export const impressionsGlobalDuration = ImpressionsGlobalDuration;
export const impressionsGlobalSession = ImpressionsGlobalSession;
export const impressionsGlobalTotal = ImpressionsGlobalTotal;
export const impressionsWidgetDuration = ImpressionsWidgetDuration;
export const impressionsWidgetSession = ImpressionsWidgetSession;
export const impressionsWidgetTotal = ImpressionsWidgetTotal;
export const hideAfterActionClosedHideCount = HideAfterActionClosedHideCount;
export const hideAfterActionClosedHideDuration =
  HideAfterActionClosedHideDuration;
export const hideAfterActionConfirmHideCount = HideAfterActionConfirmHideCount;
export const hideAfterActionConfirmHideDuration =
  HideAfterActionConfirmHideDuration;
export const hideAfterActionCancelHideCount = HideAfterActionCancelHideCount;
export const hideAfterActionCancelHideDuration =
  HideAfterActionCancelHideDuration;
export const urlContains = URLContains;

//   urlContains array
//        exclude
//        match
//        value

// form schema builder
// Post MVP
// callbacks
// content recommendations
// display conditions
//   showOnInit
//   showOnMissingFields
//   displayWhenElementVisible
//   date
//   manualTrigger
//   metaContains
// responsive
