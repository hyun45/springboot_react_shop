import { ReplyListItem } from 'types/interface';
import ResponseDto from '../response.dto';

export default interface GetReplyListResponseDto extends ResponseDto{
    replyList: ReplyListItem[];
}