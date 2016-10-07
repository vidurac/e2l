@extends('layouts.master')

@section('content')

    <h1>Homegiftcard <a href="{{ url('homegiftcard/create') }}" class="btn btn-primary pull-right btn-sm">Add New Homegiftcard</a></h1>
    <div class="table">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>S.No</th><th>Card Id</th><th>House Id</th><th>Points</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {{-- */$x=0;/* --}}
            @foreach($homegiftcard as $item)
                {{-- */$x++;/* --}}
                <tr>
                    <td>{{ $x }}</td>
                    <td><a href="{{ url('homegiftcard', $item->id) }}">{{ $item->card_id }}</a></td><td>{{ $item->house_id }}</td><td>{{ $item->points }}</td>
                    <td>
                        <a href="{{ url('homegiftcard/' . $item->id . '/edit') }}">
                            <button type="submit" class="btn btn-primary btn-xs">Update</button>
                        </a> /
                        {!! Form::open([
                            'method'=>'DELETE',
                            'url' => ['homegiftcard', $item->id],
                            'style' => 'display:inline'
                        ]) !!}
                            {!! Form::submit('Delete', ['class' => 'btn btn-danger btn-xs']) !!}
                        {!! Form::close() !!}
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <div class="pagination"> {!! $homegiftcard->render() !!} </div>
    </div>

@endsection
