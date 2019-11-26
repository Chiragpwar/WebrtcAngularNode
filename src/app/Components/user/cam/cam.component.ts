import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Chatroom, Mediastream} from '../../../modals/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClipboardService } from 'ngx-clipboard';
import * as RecordRTC from 'recordrtc';
import { Socket } from 'ngx-socket-io';
import {AuthServices} from '../../../service/CommenService';
import { DomSanitizer} from '@angular/platform-browser';
import {DataService} from '../../../service/sharedservice';

declare var $: any;
@Component({selector: 'app-cam', templateUrl: './cam.component.html', styleUrls: ['./cam.component.scss']})

export class CamComponent implements OnInit {
  public now: Date = new Date();
  constructor(private route: ActivatedRoute, private Routes: Router, private toastr: ToastrService,
              private spinner: NgxSpinnerService, private clipboardService: ClipboardService, private socket: Socket,
              private service: AuthServices, private sanitizer: DomSanitizer,
              private dataservice: DataService) {}

  @ViewChild('startButton', null) startButton: ElementRef;
  @ViewChild('callButton', null) callButton: ElementRef;
  @ViewChild('hangupButton', null) hangupButton: ElementRef;
  @ViewChild('localvideo', null) localvideo: ElementRef;
  @ViewChild('remotevideo', null) remotevideo;
  @ViewChild('player', null) player: ElementRef;
  @ViewChild('video', null) video;
  @ViewChild('videoModal', null) videoModal;
  @ViewChild('submit_message', null) submitmessage: ElementRef;

  private stream: MediaStream;
  streams = new Mediastream();
  chatcount = true;
  unreadmsg = false;
  private recordRTC: any;
  Record = true;
  userImage = false;
  Url: string;
  pics = 'assets/icon.png';
  pic: any;
  chatpic = '';
  name: string;
  media: any;
  startButtonDisabled = false;
  callButtonDisabled = true;
  hangupButtonDisabled = true;
  startTime;
  localStream;
  pc1;
  pc2;
  currentUser: any;
  offerOptions = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
  };
  sender: string;
  receiver: string;
  usersdata = [];
  ownerdata = [];
  username = [];
  datastream: any = [];
  owner: string;
  Guest: string;
  Currentowner: any;
  chat = new Chatroom();
  content: HTMLElement;
  poster = [];
  app: any;
  communication = [];
  speakers = [];
  Videoplayer = [];
  right: any;
  loading = false;
  mic: string;
  mictext = 'Mic On';
  micon = 'assets/micon.png';
  micoff = 'assets/micoff.png';
 localvideodata: any;
 remotevideodata: any;
 VideoPlayername: any;
 Camon = '';


 async ngOnInit() {
    this.Camon = 'enable';
    console.log(this.Camon);
    this.content = document.querySelector('#chat');
    this.mic = this.micon;
   // this.startRecording();
   // this.spinner.show();
    this.GetuserDetial();
    this.Socketjoin();
    this.RoomCheck();
    this.getip();
    this.initializeplayer();
   // this.socketmsg();

    this.socket.on('message', (username) => {
        this.scrollBottom();
        if (this.name === username.username) {
           this.owner = username.username;
           this.pic = username.pic;
           this.usersdata.push(username);
           } else {
             this.pic = username.pic;
             this.usersdata.push(username);
           }
        if (this.unreadmsg) {
            this.chatcount = true;
          } else {
            const user = this.currentUser !== null ?  'Guest' : this.Currentowner;
            if (this.usersdata.length === 1) {
              this.toastr.info(username.message, user);
            }
            this.chatcount = false;
          }
   });

    this.socket.on('sharescreen', async (val)  => {
      if (val.val.MediaStream !== '') {
        if (this.currentUser != null) {
          const video: HTMLVideoElement = this.localvideo.nativeElement;
          video.poster = '';
          video.src = val.val.MediaStream;
        } else {
          const video: HTMLVideoElement = this.remotevideo.nativeElement;
          video.poster = '';
          video.src = val.val.MediaStream;
        }
      } else {
        this.loading = true;
      }
    });

    this.socket.on('setposter', async (val) => {
    if (val.poster.video === 'remotevideo') {
      const video: HTMLVideoElement = this.remotevideo.nativeElement;
      video.poster = val.poster.poster;
      setTimeout(() => {
        video.poster = '';
      }, 8000);
      video.style.height = '269px';
    } else {
      const video: HTMLVideoElement = this.localvideo.nativeElement;
      video.poster = val.poster.poster;
      setTimeout(() => {
        video.poster = '';
      }, 8000);
      video.style.height = '269px';
    }
    });

    this.socket.on('Call', (val) => {
   //  this.start();
    });

    this.socket.on('calluser', (val) => {
     // this.start();
     if (val.val.MediaStream !== '') {
      if (val.val.Player === 'Local') {
        const video: HTMLVideoElement = this.localvideo.nativeElement;
        video.src = val.val.MediaStream;
        video.style.height = '269px';
       } else {
        const video: HTMLVideoElement = this.remotevideo.nativeElement;
        video.src = val.val.MediaStream;
        video.style.height = '269px';
       }
     }
    });

    this.socket.on('CloseStream', (val) => {
       if (this.currentUser != null) {
        const video: HTMLVideoElement = this.remotevideo.nativeElement;
        video.srcObject = val.stream;
       } else {
        const video: HTMLVideoElement = this.localvideo.nativeElement;
        video.srcObject = val.stream;
       }
    });
  }

   public RoomCheck() {
    this.route.paramMap.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      this.chat.Roomname = params['params'].RoomName;
      this.service.GetRoom(this.chat.Roomname).subscribe(Response => {
        const videolocal: HTMLVideoElement = this.localvideo.nativeElement;
        videolocal.muted = true;
        const videoRemote: HTMLVideoElement = this.remotevideo.nativeElement;
        videoRemote.muted = true;
        // tslint:disable-next-line: no-string-literal
        if (Response['Roomname'] !=  null) {
          // tslint:disable-next-line: no-string-literal
          this.Currentowner = Response['name'];
          // tslint:disable-next-line: no-string-literal
          this.chatpic = Response['photoUrl'];
          this.mediaconnect();
          this.start();
          setTimeout(() => {
            this.spinner.hide();
          }, 3000);
        } else {
          this.Routes.navigate(['/error/Room-not-found/' +  this.chat.Roomname]);
        }
      });

    });
   }

   public initializeplayer() {
    this.VideoPlayername = this.currentUser !== null ? 'local' : 'remote';
    this.socket.emit('Call', {
    player:  this.VideoPlayername
    });
   }

async getip() {
  await this.service.GetIp().subscribe(res => {
    if (this.currentUser == null) {
       // tslint:disable-next-line: no-string-literal
      this.name = res['ip'];
    } else {
      this.name =  this.Currentowner;
    }
});
}

async  mediaconnect() {
  this.right = await navigator.mediaDevices.getUserMedia({video: true, audio: true });
  const Device =  await navigator.mediaDevices.enumerateDevices();
  this.communication =  Device.filter(x => x.kind === 'audioinput');
  this.speakers = Device.filter(x => x.kind === 'audiooutput');
  this.Videoplayer = Device.filter(x => x.kind === 'videoinput');
  }

 public setposter(Poster, vdeo) {
    this.socket.emit('setposter', {
      poster: Poster,
      video: vdeo
    });
  }

async Screenshare() {
   this.stream = await (navigator.mediaDevices as any).getDisplayMedia({video: true, audio: { echoCancellation: false }})
  .then( this.localvideo.nativeElement.srcObject  = this.stream)
  .catch((e) => {
     this.toastr.warning('The browser is having trouble accessing your screen', 'Trouble with screen sharing');
    });
   if (this.currentUser != null) {
    this.localvideo.nativeElement.srcObject  =  this.stream;
    this.setposter('assets/loader.gif', 'remotevideo');
  } else {
    this.remotevideo.nativeElement.srcObject  =  this.stream;
    this.setposter('assets/loader.gif', 'localvideo');
  }
   this.Liverecords();
   this.app =  setInterval(() => {
    this.Liverecords();
  }, 20000);

   this.stream.getVideoTracks()[0].addEventListener('ended', () => this.ClearSharedata());
  //  this.streams.active = this.stream.active;
  //  this.streams.id = this.stream.id;
  //  this.streams.onaddtrack = this.stream.onaddtrack;
  //  this.streams.onremovetrack = this.stream.onremovetrack;
  //  this.dataservice.getIds(this.stream);
  //  const binarydata = [];
  //  binarydata.push(this.stream);
  // //  const video: HTMLVideoElement = this.remotevideo.nativeElement;
  // //  video.srcObject = this.stream;
  // //  this.app =  new Uint8Array(binarydata);
  //  this.app = window.URL.createObjectURL(new Blob(binarydata, {type: 'video/mp4'}));
  //  if (this.stream != null) {
  //      this.socket.emit('sharescreen', {
  //    MediaStream : this.app
  //   });
  // }
}

ClearSharedata() {
  const recordRTC = this.recordRTC;
  clearInterval(this.app);
  recordRTC.clearRecordedData();
  return false;
}

async Liverecords() {
  const options = {
    mimeType: 'video/mp4', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
    bitsPerSecond: 128000 // if this line is provided, skip above two
  };
  this.recordRTC = RecordRTC(this.stream, options);
  this.recordRTC.startRecording();
  this.loading = true;
  let url = '';
  setTimeout(() => {
    this.recordRTC.stopRecording();
  }, 6000);

  setTimeout(async () => {
     // tslint:disable-next-line: only-arrow-functions
    await this.recordRTC.getDataURL(function(dataURL) {
      url = dataURL;
    });
  }, 6000);

  setTimeout(async () => {
    this.socket.emit('sharescreen', {
      MediaStream : url
     });
  }, 8000);
}

muteaudio() {
  if (this.currentUser != null) {
    const video: HTMLVideoElement = this.localvideo.nativeElement;
    if (video.muted === false) {
        video.muted = true;
        this.mic = this.micon;
        this.mictext = 'Mic On';
    } else if (video.muted === true) {
      video.muted = false;
      this.mic = this.micoff;
      this.mictext = 'Mic Off';
    }
  } else {
    const video: HTMLVideoElement = this.remotevideo.nativeElement;
    if (video.muted === false) {
        video.muted = true;
        this.mic = this.micon;
        this.mictext = 'Mic On';
    } else if (video.muted === true) {
      video.muted = false;
      this.mic = this.micoff;
      this.mictext = 'Mic Off';
    }
  }
}

videoclose() {
  const video: HTMLVideoElement = this.video.nativeElement;
  video.pause();
}

  async startRecording() {
    // tslint:disable-next-line: max-line-length
    const stream = await (navigator.mediaDevices as any).getDisplayMedia({video: true, audio: { echoCancellation: false }}).then().catch((e) => {
     this.Record = true;
    });
    const options = {
      type: 'video',
      disableLogs: true,
      timeSlice: 1000,
      checkForInactiveTracks: false,
      canvas: {
        width: 640,
        height: 480
    },
      mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      bitsPerSecond: 128000 // if this line is provided, skip above two
    };

    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    this.stream.getVideoTracks()[0].addEventListener('ended', () => this.stopRecording());
  }

  stopRecording() {
    this.Record = false;
    const recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    const stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  }

  VideoPlay() {
    this.Record = true;
    const video: HTMLVideoElement = this.video.nativeElement;
    video.play();
  }

  download() {
    this.name =  this.currentUser !== null ?  this.Currentowner : 'Guest';
    this.recordRTC.save(this.name);
  }

  videoPause() {
    const video: HTMLVideoElement = this.video.nativeElement;
    video.pause();
  }

  async processVideo(audioVideoWebMURL) {
    const video: HTMLVideoElement = this.video.nativeElement;
    const recordRTC = this.recordRTC;
    video.src = audioVideoWebMURL;
    recordRTC.clearRecordedData();
    const recordedBlob = recordRTC.getBlob();
   // tslint:disable-next-line: only-arrow-functions
    await recordRTC.getDataURL(function(dataURL) {
    });
  }

  toggleControls() {
    const video: HTMLVideoElement = this.video.nativeElement;
    video.muted = !video.muted;
    video.controls = !video.controls;
    video.autoplay = !video.autoplay;
  }

  Display() {
    $('#myModal').modal('show');
  }

  GetuserDetial() {
    this.Url = window.location.href.split('//')[1];
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser != null) {
      this.pics = this.currentUser.photoUrl;
      this.name = this.currentUser.name;
    } else {
      this.name = 'Guest';
    }
  }

  getName(pc) {
    return (pc === this.pc1) ? 'pc1' : 'pc2';
  }

  getOtherPc(pc) {
    return (pc === this.pc1) ? this.pc2 : this.pc1;
  }


  async Calluser(val, player) {
    const options = {
      mimeType: 'video/mp4', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      bitsPerSecond: 128000 // if this line is provided, skip above two
    };
    this.recordRTC = RecordRTC(val, options);
    this.recordRTC.startRecording();
    this.loading = true;
    let url = '';
    setTimeout(() => {
      this.recordRTC.stopRecording();
    }, 6000);

    setTimeout(async () => {
       // tslint:disable-next-line: only-arrow-functions
      await this.recordRTC.getDataURL(function(dataURL) {
        url = dataURL;
      });
    }, 6000);

    setTimeout(async () => {
      this.socket.emit('calluser', {
        MediaStream : url,
        Player: player
       });
    }, 8000);
  }

 async gotStream(stream) {
  console.log(this.VideoPlayername);
  if (this.currentUser != null) {
   this.Calluser(stream , 'Local');
   this.app =  setInterval(() => {
      this.Calluser(stream, 'Local');
   }, 20000);

   this.localvideodata = stream;
   this.localvideo.nativeElement.srcObject = stream;
   this.localvideo.nativeElement.style.height = '269px';
   // this.remotevideo.nativeElement.srcObject = this.remotevideodata.source._value;
  } else {
    this.Calluser(stream, 'Remote');
    this.app =  setInterval(() => {
      this.Calluser(stream, 'Remote');
   }, 20000);
    this.remotevideodata = stream;
    this.remotevideo.nativeElement.srcObject = stream;
    this.remotevideo.nativeElement.style.height = '269px';
 //   this.localvideo.nativeElement.srcObject = this.localvideodata.source._value;
  }
  this.localStream = stream;
  this.videoModal.nativeElement.srcObject =  this.localStream;
  }
    start() {
      navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    })
    .then(this.gotStream.bind(this))
    .catch((e) => {
    this.Camon = 'disable';
    console.log(this.Camon);
    this.toastr.info('Try connecting a webcam to join the conversation.', 'We cant detect a camera. Others cant see you.');
    });
  }

  call() {
    this.startTime = window.performance.now();
    const videoTracks = this.localStream.getVideoTracks();
    const audioTracks = this.localStream.getAudioTracks();
    if (videoTracks.length > 0) {
     this.trace('Using video device: ' + videoTracks[0].label);
    }
    if (audioTracks.length > 0) {
      this.trace('Using audio device: ' + audioTracks[0].label);
    }
    const servers = null;
    this.pc1 = new RTCPeerConnection(servers);
    this.trace('Created local peer connection object pc1');
    this.pc1.onicecandidate = e => {
      this.onIceCandidate(this.pc1, e);
    };
    this.pc2 = new RTCPeerConnection(servers);
    this.trace('Created remote peer connection object pc2');
    this.pc2.onicecandidate = e => {
      this.onIceCandidate(this.pc2, e);
    };
    this.pc1.oniceconnectionstatechange = e => {
      this.onIceStateChange(this.pc1, e);
    };
    this.pc2.oniceconnectionstatechange = e => {
      this.onIceStateChange(this.pc2, e);
    };
    this.pc2.ontrack = this.gotRemoteStream.bind(this);

    this.localStream.getTracks().forEach(
      track => {
        this.pc1.addTrack(
          track,
          this.localStream
        );
      }
    );
    this.trace('Added local stream to pc1');

    this.trace('pc1 createOffer start');
    this.pc1.createOffer(
      this.offerOptions
    ).then(
      this.onCreateOfferSuccess.bind(this),
      this.onCreateSessionDescriptionError.bind(this)
    );
  }

  onCreateSessionDescriptionError(error) {
    this.trace('Failed to create session description: ' + error.toString());
  }

  onCreateOfferSuccess(desc) {
    this.trace('Offer from pc1\n' + desc.sdp);
    this.trace('pc1 setLocalDescription start');
    this.pc1.setLocalDescription(desc).then(
      () => {
        this.onSetLocalSuccess(this.pc1);
      },
      this.onSetSessionDescriptionError.bind(this)
    );
    this.trace('pc2 setRemoteDescription start');
    this.pc2.setRemoteDescription(desc).then(
      () => {
        this.onSetRemoteSuccess(this.pc2);
      },
      this.onSetSessionDescriptionError.bind(this)
    );
    this.trace('pc2 createAnswer start');
    // Since the 'remote' side has no media stream we need
    // to pass in the right constraints in order for it to
    // accept the incoming offer of audio and video.
    this.pc2.createAnswer().then(
      this.onCreateAnswerSuccess.bind(this),
      this.onCreateSessionDescriptionError.bind(this)
    );
  }

  onSetLocalSuccess(pc) {
    this.trace(this.getName(pc) + ' setLocalDescription complete');
  }

  onSetRemoteSuccess(pc) {
    this.trace(this.getName(pc) + ' setRemoteDescription complete');
  }

  onSetSessionDescriptionError(error) {
    this.trace('Failed to set session description: ' + error.toString());
  }

  gotRemoteStream(e) {
  if (this.remotevideo.nativeElement.srcObject !== e.streams[0]) {
      this.remotevideo.nativeElement.srcObject = e.streams[0];
      this.trace('pc2 received remote stream');
    }
  }

  onCreateAnswerSuccess(desc) {
    this.trace('Answer from pc2:\n' + desc.sdp);
    this.trace('pc2 setLocalDescription start');
    this.pc2.setLocalDescription(desc).then(
      () => {
        this.onSetLocalSuccess(this.pc2);
      },
      this.onSetSessionDescriptionError.bind(this)
    );
    this.trace('pc1 setRemoteDescription start');
    this.pc1.setRemoteDescription(desc).then(
      () => {
        this.onSetRemoteSuccess(this.pc1);
      },
      this.onSetSessionDescriptionError.bind(this)
    );
  }

  onIceCandidate(pc, event) {
    this.getOtherPc(pc).addIceCandidate(event.candidate)
    .then(
      () => {
        this.onAddIceCandidateSuccess(pc);
      },
      (err) => {
        this.onAddIceCandidateError(pc, err);
      }
    );
    this.trace(this.getName(pc) + ' ICE candidate: \n' + (event.candidate ?
        event.candidate.candidate : '(null)'));
  }

  onAddIceCandidateSuccess(pc) {
    this.trace(this.getName(pc) + ' addIceCandidate success');
  }

  onAddIceCandidateError(pc, error) {
    this.trace(this.getName(pc) + ' failed to add ICE Candidate: ' + error.toString());
  }

  onIceStateChange(pc, event) {
    if (pc) {
      this.trace(this.getName(pc) + ' ICE state: ' + pc.iceConnectionState);
      console.log('ICE state change event: ', event);
    }
  }

  hangup() {
    this.trace('Ending call');
    this.pc1.close();
    this.pc2.close();
    this.pc1 = null;
    this.pc2 = null;
    this.hangupButtonDisabled = true;
    this.callButtonDisabled = false;
  }

  trace(arg) {
    const now = (window.performance.now() / 1000).toFixed(3);
    console.log(now + ': ', arg);
  }

  copy(text) {
    text.select();
    document.execCommand('copy');
    text.setSelectionRange(0, 0);
   // this.clipboardService.copyFromContent(text);
    this.toastr.info(text.value, 'Copied');
  }

  openchat() {
    this.chatcount = true;
    const data = document.getElementById('sidebar_secondary');
    data.classList.add('popup-box-on');
    // tslint:disable-next-line: max-line-length
    document.getElementById('chat').style.backgroundImage = 'url(\'assets/Chatbackground.jpg\')';
  }

  closechat() {
    this.chatcount = true;
    this.unreadmsg = false;
    this.usersdata = [];
    const data = document.getElementById('sidebar_secondary');
    data.classList.remove('popup-box-on');
  }

 async Socketjoin() {
  const room = this.route.snapshot.paramMap.get('RoomName');
  await this.socket.emit('join', room);
  }

  scrollBottom() {
    setTimeout(() => (this.content.scrollTop = this.content.scrollHeight), 60);
  }

 async keyDownFunction(e, val) {

    if (e.keyCode === 13) {
      if (this.currentUser == null) {
        this.name = this.name;
        this.pic = 'assets/icon.png';
        // tslint:disable-next-line: no-unused-expression
      } else {
        this.name = this.currentUser.name;
        this.pic = this.currentUser.photoUrl;
      }
      this.now = new Date();
      this.unreadmsg = true;
      this.submitmessage.nativeElement.value = '';
      this.scrollBottom();
      await this.socket.emit('message', {
        sender: this.name,
        msg: val,
        time: this.now,
        pics : this.pic
      });
    }
  }

  public FeedBack() {
  const recordRTC = this.recordRTC;
  const stream = this.localStream;
  stream.getAudioTracks().forEach(track => track.stop());
  stream.getVideoTracks().forEach(track => track.stop());
  clearInterval(this.app);
  this.socket.emit('CloseStream', {
   stream: null
  });
  recordRTC.clearRecordedData();
  if (this.currentUser != null) {
      this.Routes.navigate(['/user/feedback']);
    } else {
      this.Routes.navigate(['user/leave-room']);
    }
  }
}
